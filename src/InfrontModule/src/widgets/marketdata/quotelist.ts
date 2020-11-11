import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  Optional,
} from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';

@Component({
  selector: 'quotelist',
  template: '<div #targetElement></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteList extends BaseWidgetWrapper {
  widget: Infront.InfrontWidget;
  constructor(
    protected infrontUIService: InfrontUIService,
    @Optional() protected widgetService: WidgetService
  ) {
    super(infrontUIService, widgetService);
  }
  protected async createWidget(): Promise<Infront.InfrontWidget> {
    var infront = await this.infrontUIService.getInfront();
    this.widget = infront.quoteList(
      this.targetElement.nativeElement,
      this._widgetOptions
    );

    // setTimeout(() => {
    //     a.chainDropDown.list.data.forEach(element => {
    //         if (element.hasSubMenu) {
    //             element.subMenu.forEach(e => {
    //                 console.log(e.item);
    //             });
    //         }
    //         console.log(element.item);
    //     });
    // }, 1000);
    return this.widget;
  }
}
