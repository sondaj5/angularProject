import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';



@Component({
    selector: 'activefilters',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActiveFilters extends BaseWidgetWrapper {
    public activeFiltersWidget: Infront.ScreenerActiveFiltersWidget;

    constructor(protected infrontUIService: InfrontUIService,  @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }
    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        this.activeFiltersWidget = infront.activeFiltersWidget(this.targetElement.nativeElement, this._widgetOptions);
        return this.activeFiltersWidget;
    }
}
