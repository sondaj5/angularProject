import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { VisualsWidgetWrapper } from "../visualsWidgetWrapper";
import { InfrontUIService } from '../../services/InfrontUI';

declare function require(name:string);
let ps = require('perfect-scrollbar');

@Component({
    selector: 'screener',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Screener extends VisualsWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService) {
        super(infrontUIService);
    }

    protected async createWidget(): Promise<any> {
        this.widgetOptions.hasContentCallback =  (hasContent) => {
            if (hasContent == true) {
                this.targetElement.nativeElement.parentElement.style.height = this.widgetOptions.hasContentHeight;
                ps.update(this.targetElement.nativeElement.parentElement);
            }
        };
        return this.visual.ScreenerWidget(this.targetElement.nativeElement, this.widgetOptions);
    }
}