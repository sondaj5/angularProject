import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'financialcalendar',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FinancialCalendar extends BaseWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService,  @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }
    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        return infront.financialCalendarWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
