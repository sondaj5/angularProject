import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { TradingService } from '../../services/trading';
import { WidgetService } from '../../services/widgetService';
import { TradingWidgetWrapper } from '../tradingWidgetWrapper';

@Component({
    selector: 'bondsTrading',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BondsTrading extends TradingWidgetWrapper {
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(ref, infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        return infront.bondsTradingWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
