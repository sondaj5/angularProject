import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';



@Component({
    selector: 'focus',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Focus extends BaseWidgetWrapper {
    constructor(protected infrontUIService: InfrontUIService,  @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        return this.infrontUIService.getInfront().then(infront => {
            return infront.focusWidget(this.targetElement.nativeElement, this._widgetOptions);
        });
    }
}
