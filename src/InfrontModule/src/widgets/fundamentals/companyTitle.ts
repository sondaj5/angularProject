import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { VisualsWidgetWrapper } from "../visualsWidgetWrapper";
import { InfrontUIService } from '../../services/InfrontUI';

@Component({
    selector: 'companytitle',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyTitle extends VisualsWidgetWrapper {

    private _buyButtonVisible: boolean;

    get buyButtonVisible() {
        return this._buyButtonVisible;
    }

    constructor(protected infrontUIService: InfrontUIService) {
        super(infrontUIService);
    }

    protected async createWidget(): Promise<any> {
        if (this.widgetOptions.buyButton) {
            this.widgetOptions.buyElement = "buySellContainer";
            this.widgetOptions.hasContentCallback = (hasContent) => {
                if (hasContent == true) {
                    this._buyButtonVisible = true;
                }
            };
        }
        return this.visual.CompanyTitleWidget(this.targetElement.nativeElement, this.widgetOptions);
    }
}
