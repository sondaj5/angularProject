
import {first} from 'rxjs/operators';
import { Injectable, OnInit, Optional } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { InfrontUIService } from './InfrontUI';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class TradingService implements CanActivate {

    private loggedInToTrading: boolean;

    tradingObservableSource = new Subject<boolean>();
    public tradingObservable = this.tradingObservableSource.asObservable();

    portfolioCurrencySource = new Subject<string>();
    public portfolioCurrency = this.portfolioCurrencySource.asObservable();
    public currentPortfolioCurrency: string = "";
    
    public modifyOrderEntry: (newOpts: Infront.OrderEntryWidgetOptions) => void;
    public resetOrderEntry: () => void;
    public activeTgwPid: number = null;

    constructor(private infrontUiService: InfrontUIService) {
        //console.log("tradingService instanciated");
    }

    async init() {
        let infront = this.infrontUiService.getModel().then((model) => {
            model.registerTradingConnectedEventObserverWithCallbackIfConnected(this._infrontTradingLoggedIn);
            model.registerEventObserver(Infront.TradingLoginCanceledEvent.kEventName, this._infrontTradingLoggedOut);
            model.registerEventObserver(Infront.TradingLoginFailedEvent.kEventName, (event: Infront.InfrontEvent) => { this._infrontTradingLoggInFailed(event) });
            model.registerEventObserver(Infront.TradingDisconnectedEvent.kEventName, this._infrontTradingLoggedOut);
            model.registerEventObserver(Infront.TradingTokenInvalidEvent.kEventName, (event: Infront.InfrontEvent) => { this._infrontTradingTokenInvalid(); });
            model.registerEventObserver(Infront.PortfolioCurrencyChangedEvent.kEventName, (event: Infront.InfrontEvent) => {
                this.portfolioCurrencySource.next(event.message);
                this.currentPortfolioCurrency = event.message;
            });

            this.loggedInToTrading = model.getTradingStatus() != Infront.InfrontStatus.Uninitialized && model.getTradingStatus() != Infront.InfrontStatus.Disconnected;
        });
    }

    _infrontTradingLoggedIn = () => {
        this.loggedInToTrading = true;
        this.infrontUiService.getModel().then((model) => {
            this.activeTgwPid = model.getTradingSession().values.pid;
        });
        this.tradingObservableSource.next(true);
    }

    _infrontTradingLoggedOut = () => {
        this.loggedInToTrading = false;
        this.activeTgwPid = null;
        this.tradingObservableSource.next(false);
    }

    _infrontTradingLoggInFailed(event: Infront.InfrontEvent) {
        this.infrontUiService.getInfront().then((infrontUI) => {
            infrontUI.tradingLogin(event.message)
        });
    }

    _infrontTradingTokenInvalid() {

    }

    checkTradingAccess(): boolean {
        return this.loggedInToTrading;
    }

    isValidTradingLogin(): Promise<boolean> | boolean {
        if (!this.checkTradingAccess()) {
            this.infrontUiService.getInfront().then((infrontUI) => {
                infrontUI.tradingLogin();
            });
            return this.tradingObservable.pipe(first()).toPromise();
        }
        else {
            return true;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isValidTradingLogin();
    }
}
