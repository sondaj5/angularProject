import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { VisualsWidgetWrapper } from "../visualsWidgetWrapper";
import { InfrontUIService } from '../../services/InfrontUI';

@Component({
    selector: 'shortpositions',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShortPositions extends VisualsWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService) {
        super(infrontUIService);
    }

    protected async createWidget(): Promise<any> {
        return this.visual.ShortPositionsWidget(this.targetElement.nativeElement, this.widgetOptions);
    }
}