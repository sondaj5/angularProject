import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';

@Component({
    selector: 'portfolioselect',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioSelect extends TradingWidgetWrapper {
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        this._widgetOptions.id = "trdbarPortSel";
        this._widgetOptions.storageType = "global"; // All PortfolioSelects share points to same storage to stay in sync

        var infront = await this.infrontUIService.getInfront();
        return infront.portfolioSelectWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
