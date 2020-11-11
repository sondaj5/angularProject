import { Component, Input, OnChanges, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'alertlist',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertList extends BaseWidgetWrapper {

    protected widget: Infront.AlertListWidget;
    private binding: Infront.ObservableBinding;
    constructor(protected infrontUIService: InfrontUIService,  @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);

        this.binding = new Infront.ObservableBinding();

        this.binding.valueUpdated = (alertAdded) => {
            if (this.widget) {
                this.widget.reloadData();
            }
        };

        if (widgetService) {
            this.widgetService.alertUpdated.observe(this.binding);
        } 
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        return infront.alertListWidget(this.targetElement.nativeElement, this._widgetOptions);
    }

    ngOnDestroy() {
        if (this.widgetService) {
            this.widgetService.alertUpdated.unbind(this.binding);
        }
        super.ngOnDestroy();
    }


}

