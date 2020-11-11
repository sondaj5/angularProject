import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'intradaytrades',
    template: `
        <div class="wt-widget-scrollable" #targetElement></div>
        <div class="wt-empty-table-message  wt-empty-table-message--two-lines" [hidden]="!hidden"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IntradayTrades extends BaseWidgetWrapper {

    private _prevDate: string;

    get prevDate() {
        return this._prevDate;
    }
     
    constructor(protected infrontUIService: InfrontUIService, protected ref: ChangeDetectorRef, @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        this._widgetOptions.hasContentCallback = (has: boolean, date:string) => {
            if (has == false) {
                this._hidden = true;
                this._prevDate = date;
            }
            else {
                this._hidden = false;
                this.ref.detectChanges();
            }
        };
        return infront.intradayTradesWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
