import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { VisualsWidgetWrapper } from "../visualsWidgetWrapper";
import { InfrontUIService } from '../../services/InfrontUI';

@Component({
    selector: 'grpv',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Grpv extends VisualsWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService) {
        super(infrontUIService);
    }

    protected async createWidget(): Promise<any> {
        return this.visual.GprvD3Widget(this.targetElement.nativeElement, this.widgetOptions);
    }
    
    protected destroyLinkedFields = () => {
        if (this.widgetOptions.fieldsElement) {
            let element = document.querySelector(this.widgetOptions.fieldsElement);
            while (element && element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        //this.widget.destroy();
    }

}