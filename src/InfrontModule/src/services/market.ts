import { Injectable, Optional } from '@angular/core';
import { InfrontUIService } from './InfrontUI';
import { Subject } from 'rxjs';
import { WTMarketFeed } from './marketFeeds';

export enum MarketType {
    UNKNOWN,
    STOCKS,
    BONDS,
    FUNDS,
    ETF_FUNDS,
    OPTIONS,
    WARRANTS,
    FOREX,
    FUTURES
}

@Injectable()
export class MarketService {

    public feed: number;

    private metaData: Infront.FeedMetaData;
    private feedDescription: string;
    private mainIndex: Infront.Instrument;
    private newsAvailableResolved: boolean;
    private newsAvailable: boolean;


    private feedObservableSource = new Subject<number>();
    feedObservable = this.feedObservableSource.asObservable();

    constructor(private infrontUI: InfrontUIService) {

    }

    public setFeed(feed: number) {
        if (feed !== this.feed) {
            this.clear();
            this.feed = feed;
        }
    }

    notifyObservers() {
        this.feedObservableSource.next(this.feed);
    }

    public getFeed(): number {
        return this.feed;
    }

    public async hasUSOrEuroOptions() {
        const { data_types } = await this.getMetaData();
        return data_types.includes('EUROOPTIONS') || data_types.includes('USOPTIONS'); 
    }

    public async getMetaData(): Promise<Infront.FeedMetaData> {
        if (!this.metaData) {
            await this.setMarketInfo();
        }
        return new Promise<Infront.FeedMetaData>((resolve, reject) => {
            if (!this.metaData) {
                reject();
            }
            else {
                resolve(this.metaData);
            }
        });
    }

    public async getFeedDescription(): Promise<string> {
        if (this.metaData) {
            return this.feedDescription;
        }
        else {
            await this.setMarketInfo();
            return this.feedDescription;
        }
    }

    public async getMainIndex(): Promise<Infront.Instrument> {
        if (this.mainIndex) {
            return this.mainIndex;
        }
        else {
            await this.setMarketInfo();
            return this.mainIndex;
        }
    }

    public async getNewsAvailable(): Promise<boolean> {
        if (!this.newsAvailableResolved) {
            await this.setMarketInfo();
        }
        return this.newsAvailable;
    }

    public async resolveIfNewsIsAvailable(): Promise<{}> {
        // get news-sources and -regions to check if we have access to news for this country.
        return new Promise((resolve, reject) => {
            var opts = new Infront.DataOptions;
            opts.onError = (error_code, error_message) => {
                this.newsAvailable = true;
                this.newsAvailableResolved = true;
                resolve();
            };
            opts.onData = (data) => {
                if (data["regions"]) {
                    var regs = data["regions"];
                    for (var i = 0; i < regs.length; i++) {
                        if (regs[i].code === this.metaData.country) {
                            this.newsAvailable = true;
                            this.newsAvailableResolved = true;
                            resolve();
                        }
                    }
                }
                this.newsAvailable = true;
                this.newsAvailableResolved = true;
                resolve();
            };
            this.infrontUI.getModel().then(infrontUI => {
                infrontUI.newsSources(opts);
            });
        });
    }

    public setMarketInfo(): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.infrontUI.getModel().then((infrontUI) => {
                infrontUI.getFeedHandler().getFeed(this.feed, (metaData: Infront.FeedMetaData) => {
                    if (!metaData) {
                        reject("No metadata found");
                    }
                    else {
                        this.metaData = metaData;
                        this.feedDescription = metaData.description;

                        if (metaData.hasOwnProperty("main_index")) {
                            this.mainIndex = new Infront.Instrument(metaData["main_index_feed"] ? metaData["main_index_feed"] : metaData.feed, metaData["main_index"]);
                        }
                        resolve();
                    }
                });
            });
        });
    }

    public async getMarketData(): Promise<WTMarketFeed> {
        let marketList = await this.infrontUI.getMarketList();
        var marketData = null;
        for (let market of marketList) {
            if (market.feed == this.feed)
                marketData = market;
        }
        //marketList.forEach((item:any) => {
        //    if (item.feed == this.feed)
        //        return item;
        //});

        return marketData;
    }

    public getMarketType(metaData: Infront.FeedMetaData | WTMarketFeed): MarketType {
        if (metaData && metaData.data_types) {
            var dataTypes = metaData.data_types;
            if (dataTypes.indexOf(Infront.FeedDataTypes.USOPTIONS) >= 0)
                return MarketType.OPTIONS;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.WARRANTS) >= 0)
                return MarketType.WARRANTS;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.EUROOPTIONS) >= 0)
                return MarketType.OPTIONS;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.FUTURES) >= 0)
                return MarketType.FUTURES;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.BONDS) >= 0)
                return MarketType.BONDS;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.FUNDS) >= 0)
                return MarketType.FUNDS;
            else if (dataTypes.indexOf(Infront.FeedDataTypes.STOCKS) >= 0 || dataTypes.indexOf(Infront.FeedDataTypes.INDICES) >= 0)
                return MarketType.STOCKS;
            else
                return MarketType.UNKNOWN;
        }
        return MarketType.UNKNOWN;

    }

    clear() {
        this.feed = undefined;
        this.metaData = undefined;
        this.feedDescription = undefined;
        this.mainIndex = undefined;
        this.newsAvailableResolved = undefined;
        this.newsAvailable = undefined;
    }
}
