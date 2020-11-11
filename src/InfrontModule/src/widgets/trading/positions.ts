import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';

@Component({
    selector: 'positions',
    template: '<div [hidden]="hidden" #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Positions extends TradingWidgetWrapper {
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
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
        var infront = await this.infrontUIService.getInfront();
        return infront.positionsWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
