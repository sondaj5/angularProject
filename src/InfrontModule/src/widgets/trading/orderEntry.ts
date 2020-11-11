import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { TradingService } from '../../services/trading';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';
import { Subscription } from 'rxjs';
import { TerminalWebService } from '../../services/marketFeeds';

@Component({
    selector: 'orderentry',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrderEntry extends TradingWidgetWrapper {

    private intervalRef: number = 0;
    private subscription: Subscription;

    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, private tradingService: TradingService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);

        tradingService.modifyOrderEntry = (opts: Infront.OrderEntryWidgetOptions) => {
            this.modify(opts);
            if (this.intervalRef !== 0) {
                return;
            }
            if (opts.initialPrice) {
                this.intervalRef = window.setInterval(() => {
                    if (this.targetElement.nativeElement.offsetParent) {  // if offsetParent === null 
                        window.clearInterval(this.intervalRef);
                        this.intervalRef = 0;
                        if (this.widget) (this.widget as Infront.OrderEntryWidget).setFocus();
                    }
                }, 50);
            }
        };
        tradingService.resetOrderEntry = () => {
            if (this.widget) {
                (this.widget as Infront.OrderEntryWidget).reset();
                if (this.intervalRef !== 0) { return; }
                this.intervalRef = window.setInterval(() => {
                    if (this.targetElement.nativeElement.offsetParent) {  // if offsetParent === null 
                        window.clearInterval(this.intervalRef);
                        this.intervalRef = 0;
                        if (this.widget) (this.widget as Infront.OrderEntryWidget).setFocus();
                    }
                }, 50);
            }
        };
    }

    private setTradingGatewayPid(tgwPid: number, kidServices: TerminalWebService[]) {
        this._widgetOptions.kidLinkDefinition = null;
        this._widgetOptions.customKidMidCalculation = null;
        if (tgwPid != null) {
            if (tgwPid == 277) {
                this._widgetOptions.customKidMidCalculation = this.customKidMidCalculation;
                this._widgetOptions.customKidMidUrlParameter = "NordnetMarketplace";
            }
            if (kidServices != null) {
                let defaultKidService = null;
                for (let i = 0; i < kidServices.length; i++) {
                    if (InfrontUtil.parseFloatValue(kidServices[i].PID) == tgwPid) {
                        this._widgetOptions.kidLinkDefinition = kidServices[i];
                        break;
                    }
                    else if (!defaultKidService && kidServices[i].PID == null) {
                        defaultKidService = kidServices[i];
                    }
                }
                this._widgetOptions.kidLinkDefinition = this._widgetOptions.kidLinkDefinition || defaultKidService;
            }
        }
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();

        var kidServices = await this.infrontUIService.getKidServices();
        var tgwPid = this.tradingService.activeTgwPid;
        this.setTradingGatewayPid(tgwPid, kidServices);
        this.subscription = this.tradingService.tradingObservable.subscribe((loggedIn) => {
            if (loggedIn) {
                this.setTradingGatewayPid(this.tradingService.activeTgwPid, kidServices);
                this.modify(this._widgetOptions);
            }
        });

        return infront.orderEntryWidget(this.targetElement.nativeElement, this._widgetOptions);


    }
    public modify(opts: Infront.OrderEntryWidgetOptions) {
        if (this.widget) {
            if (this._widgetOptions.kidLinkDefinition && !opts.kidLinkDefinition)
                opts.kidLinkDefinition = this._widgetOptions.kidLinkDefinition;
            if (this._widgetOptions.customKidMidCalculation && !opts.customKidMidCalculation)
                opts.customKidMidCalculation = this._widgetOptions.customKidMidCalculation;
            if (this._widgetOptions.customKidMidUrlParameter && !opts.customKidMidUrlParameter)
                opts.customKidMidUrlParameter = this._widgetOptions.customKidMidUrlParameter;

            this.widget.modify(opts);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }

    private customKidMidCalculation(feedNu: number, mic: string): string {
        switch (feedNu) {
            case 14: return "17";
            case 15: return "19";
            case 26: return "4";

            case 28: return "18";
            case 100: return "24";
            case 102: return "54";
            case 2000: return "4";
            case 2163: return "25";
            case 2186 : return "4";
            case 2196: return "62";
            case 2206: return "115";
            case 2234: return "36";
            case 2235:
                if (mic == "XNGM") return "36";
                return "62";
            case 2236: return "64";
            case 2237: return "64";
            case 5730: return "54";
            case 6090: return "18";
            case 6092: return "18";
            case 17665: return "14";
            case 17667: return "23";
            case 17669: return "14";
            case 17677: return "55";
            case 17921: return "11";
            case 17922: return "40";
            case 17923: return "12";
            case 17931: return "53";
            case 17938:
                if (mic == "NMTF") return "66";
                return "13";
            case 17943: return "35";
            case 17942:
            case 17944:
                if (mic == "XNGM") return "35";
                return "61";
            case 17952: return "53";
            case 17962: return "30";
            case 17963: return "32";
            case 17964: return "33";
            case 17965: return "31";
            case 17971: return "47";
            case 17982: return "30";
            case 17997: return "30";
            case 18011: return "40";
            case 18040:
            case 18041:
                if (mic == "XNGM") return "48";
                return "63";
            case 18051: return "52";
            case 18177:
                if (mic == "MERK") return "49";
                return "15";
            case 18179: return "34";
            case 18207: return "15";
            case 18221: return "15";
        }
        return "";

    }
}
