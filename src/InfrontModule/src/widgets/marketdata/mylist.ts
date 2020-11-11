import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'mylist',
    template: '<div #targetElement></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyList extends BaseWidgetWrapper {

    constructor(protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
        //console.log('mylist is initialized')
    }
    protected async createWidget(): Promise<Infront.InfrontWidget> {
     //   var infront = await this.infrontUIService.getInfront();
       // return infront.myListsWidget(this.targetElement.nativeElement, this._widgetOptions);

        return this.infrontUIService.getInfront().then((infront) => {
            //console.log('returning mylist')

            return this.widget = infront.myListsWidget(this.targetElement.nativeElement, this._widgetOptions);
        });
    }
 }
