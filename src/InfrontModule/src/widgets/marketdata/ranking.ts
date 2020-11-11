import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';



@Component({
    selector: 'ranking',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Ranking extends BaseWidgetWrapper {
    private metaData: Infront.FeedMetaData;
    private mainIndex: Infront.Instrument;
    private ranking: string;

    constructor(protected infrontUIService: InfrontUIService,  @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }
    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        return infront.rankingWidget(this.targetElement.nativeElement, this._widgetOptions);
    }
}
