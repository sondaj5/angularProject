import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';

@Component({
    selector: 'portfoliovalues',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioValues extends TradingWidgetWrapper {
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        return infront.portfolioValuesWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
