import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';



@Component({
    selector: 'putcall',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Input()
export class PutCall extends BaseWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }
    protected async createWidget(): Promise<Infront.InfrontWidget> {
        return this.infrontUIService.getInfront().then((infront) => {
            return this.widget = infront.putCallWidget(this.targetElement.nativeElement, this._widgetOptions);
        });
    }
}
