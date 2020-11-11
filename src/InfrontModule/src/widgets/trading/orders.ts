import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';

@Component({
    selector: 'orders',
    template: '<div #targetElement></div><div class="wt-empty-table-message" [hidden]="!hidden">{{wt.languageStrings.Global_Label_NoData}}</div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Orders extends TradingWidgetWrapper {
    wt: any;
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        if (!this._widgetOptions.hasContentCallback) {
            this._widgetOptions.hasContentCallback = (has: boolean) => {
                if (has == false) {
                    this._hidden = true;
                }
                else {
                    this._hidden = false;
                }
                this.ref.detectChanges();
            };
        }
        return infront.ordersWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
