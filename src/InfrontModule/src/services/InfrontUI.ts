import { Injectable, Optional, SkipSelf } from '@angular/core';
import { UserService } from './user';
import { Subject, Subscription } from 'rxjs';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FeedInfo, WTMarketFeed, infrontCountryInfo, TerminalWebService } from './marketFeeds';

@Injectable({
    providedIn: 'root',
})
export class InfrontUIService {
    private infrontSource = new Subject<Infront.UI>();
    public infrontDefined$ = this.infrontSource.asObservable();

    private infrontPromise: Promise<Infront.UI>;

    private visual: any;
    //private marketDataRequest: Promise<Object>;
    private feedInfo: Promise<FeedInfo>;
    //private marketsPromise: Promise<WTMarketFeed[]>;

    private marketDataConnectedStatus = new Subject<Infront.InfrontStatus>();
    public marketDataConnectedStatus$ = this.marketDataConnectedStatus.asObservable();
    public lastDisconnectedEvent: Infront.DisconnectEvent;

    private isReconnecting: boolean = false;
    public isDisconnected: Infront.Observable<boolean> = new Infront.Observable(false);
    public disconnectedReason: string = "";
    public loginInfo: Promise<IDS.LoginInfo>;
    public featureStrings: Promise<Object>;

    private mwsLogSubscription: Subscription;
    private reconnectSubscription: Subscription;

    private resolveLoginInfo: (loginInfo: IDS.LoginInfo) => void;
    private resolveFeatureStrings: (featureStrings: Object) => void;

    constructor(@Optional() @SkipSelf() parentModule: InfrontUIService, private http: HttpClient) {
        if (parentModule) {
            throw new Error(
                'InfrontUIService is already loaded.');
        }
    }

    public setLanguage(language: object) {
        const lang = 'sv';
        Infront.languageMap[lang] = language;
        InfrontUtil.formatSettings.timeFormat = 'HH:mm';
        InfrontUtil.formatSettings.dateFormat = 'yy-MM-dd';
        InfrontUtil.formatSettings.useKiloMegaFormat = false;
    }

    public initzializeInfrontWithToken(token: string) {
        this.initzializeInfront(token);
    }

    private initzializeInfront(signedToken: string) {
        const opts = new Infront.InfrontUIOptions();
        opts.enableLoginDialog = true;
        opts.store_session = false;
        opts.useIds = true;
        opts.useMws = false;
        opts.streaming = false;
        opts.token_type = 'IDP';
        opts.secureConnection = Infront.ConnectionSecurity.Require;
        opts.signed_token = signedToken;
        opts.language = 'sv';
        const infront = new Infront.UI(opts);

        let infrontReady;
        this.infrontPromise = new Promise(resolve => {
            infrontReady = () => {
                resolve(infront);
            };
        });

        infront.registerEventObserver("onReady", infrontReady);
        infront.init();

        this.setMarketList();
        this.setupInfront();


        this.loginInfo = new Promise((resolve) => {
            this.resolveLoginInfo = (loginInfo: IDS.LoginInfo) => {
                resolve(loginInfo);
            };
        });

        this.featureStrings = new Promise((resolve) => {
            this.resolveFeatureStrings = (featureStrings: Object) => {
                resolve(featureStrings);
            };
        });
    }

    async setupInfront() {
        this.infrontPromise.then((infr: Infront.UI) => {
            infr.getModel().registerTradingConnectedEventObserverWithCallbackIfConnected((event: Infront.InfrontEvent) => { this.onMdConnected(event) });
            infr.registerEventObserver(Infront.DisconnectEvent.kEventName, (event: Infront.DisconnectEvent) => { this.onMdDisconnect(event) });
            infr.registerEventObserver(Infront.LoginFailedEvent.kEventName, (event: Infront.LoginFailedEvent) => { this.onMdLoginFailed(event) });
            this.resolveLoginInfo(infr.getModel().getLoginInfo());
            this.resolveFeatureStrings(infr.getModel().getFeatureStrings());
        });
    }

    getInfront(): Promise<Infront.UI> {
        return this.infrontPromise;
    }

    async getModel(): Promise<Infront.Model> {
        return this.getInfront().then((infrontUI) => {
            return infrontUI.getModel();
        });
    }

    defineVisual(visual: any): void {
        this.visual = visual;
    }

    getVisual(): any {
        return visual;
    }

    async getMainIndexMarketFeed(instrument: Infront.Instrument) {
        return new Promise<number>((resolve, reject) => {
            var opts = new Infront.DataOptions();
            opts.onData = (data: any) => {
                if (data.instrument && data.instrument.under_feed) {
                    resolve(data.instrument.under_feed)
                }
                else {
                    resolve(instrument.feed);
                }
            };
            opts.onError = () => { reject("feed not found") };

            this.getModel().then((model) => {
                model.instrumentInfoPromise(instrument.feed, instrument.ticker).then(instrument => {
                    if (instrument && instrument.under_feed) {
                        resolve(instrument.under_feed)
                    }
                    else {
                        resolve(instrument.feed);
                    }
                });
            });
        });
    }

    async getMainIndex(feed: number): Promise<Infront.Instrument> {
        let metaData = await this.getMarketMetadata(feed);
        if (metaData.hasOwnProperty("main_index"))
            return new Infront.Instrument(metaData["main_index_feed"] ? metaData["main_index_feed"] : metaData.feed, metaData["main_index"]);
    }

    async getMarketMetadata(feed: number): Promise<Infront.FeedMetaData> {
        var promise = new Promise<Infront.FeedMetaData>((resolve, reject) => {
            this.getModel().then((model) => {
                model.getFeedHandler().getFeed(feed, (metaData: Infront.FeedMetaData) => {
                    if (!metaData) {
                        reject("No metadata found");
                    }
                    else {
                        resolve(metaData);
                    }
                });
            });
        });
        return promise.then((val: Infront.FeedMetaData) => { return val }, (error: string) => { return null });
    }

    async getMarketList(): Promise<WTMarketFeed[]> {
        return this.feedInfo.then(feedInfo => {
            return feedInfo.getMarketList();
        });
    }
    async getKidServices(): Promise<TerminalWebService[]> {
        return this.feedInfo.then(feedInfo => {
            return feedInfo.getKidServices();
        });
    }
    async getUserCountries(): Promise<infrontCountryInfo[]> {
        return this.feedInfo.then(feedInfo => {
            return feedInfo.getUserCountries();
        })
    }

    async getEmailDevice(): Promise<any> {
        return this.infrontPromise.then(infrontUi => {
            return infrontUi.getModel().getEmailDevice();
        })
    }

    public setEmailDevice(email: string, enabled: boolean): void {
        this.infrontPromise.then(infrontUi => {
            infrontUi.getModel().setEmailDevice(email, enabled);
        })
    }

    private setMarketList() {
        this.feedInfo = new Promise((resolve, reject) => {
            this.infrontPromise.then(infrontUi => {
                resolve(new FeedInfo(infrontUi, infrontUi.getModel()));
            })
        });
    }

    private onMdConnected(event: Infront.InfrontEvent) {
        this.marketDataConnectedStatus.next(Infront.InfrontStatus.Connected);
        this.isDisconnected.set(false);
    }

    private onMdDisconnect(event: Infront.DisconnectEvent) {
        this.lastDisconnectedEvent = event;
        this.marketDataConnectedStatus.next(Infront.InfrontStatus.Disconnected);

        var reason = event ? event.reason : 2;
        this.disconnectedReason = event ? event.message || "" : "";
        switch (reason) {
            case Infront.DisconnectEventReason.KICKOUT: {
                this.isDisconnected.set(true);

            }
            case Infront.DisconnectEventReason.DISCONNECT:
            case Infront.DisconnectEventReason.INVALID_SESSION_TOKEN:
            case Infront.DisconnectEventReason.UNKNOWN: {
                this.isDisconnected.set(true);
            }
        }
    }

    private onMdLoginFailed(event: Infront.LoginFailedEvent) {
        this.lastDisconnectedEvent = null;
        this.marketDataConnectedStatus.next(Infront.InfrontStatus.Disconnected);
    }

    ngOnDestroy() {
        if (this.reconnectSubscription) {
            this.reconnectSubscription.unsubscribe();
        }
    }
}

declare global {
    var visual: any;
}