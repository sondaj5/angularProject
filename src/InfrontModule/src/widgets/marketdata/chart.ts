/// <reference path="../../../typings/highcharts.d.ts" />

import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectionStrategy, Optional, SimpleChanges, HostListener } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { WidgetService } from '../../services/widgetService';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'chart',
    template: '<div #targetElement [ngStyle]="currentStyle"></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Chart extends BaseWidgetWrapper {

    private _currentStyle: Object;
    private _defaultPeriod: Infront.HistoricalPeriod;

    protected widget: Infront.ComplexChartWidget;
    public _widgetOptions: Infront.ChartWidgetOptions2;

    private resizeTimeout: any;

    get currentStyle() {
        return this._currentStyle
    };

    private _height: string;
    @Input()
    set height(height: string) {
        this._height = height;

        this._currentStyle = {
            "minHeight": this._height ? this._height : "320px",
            "height": this._height ? this._height : "320px"
        };

        //this.recreateWidget();
        this.resizeWidget();
    };

    @Input()
    set period(period: Infront.HistoricalPeriod) {
        if (this.widget) {
            this.widget.periodSelected(period, true);
        }
        this._defaultPeriod = period;
    }

    @Input()
    set hideDropdowns(value: boolean) {
        if (this.widget && value)
            this.widget.hideDropdowns();
    }

    constructor(protected infrontUIService: InfrontUIService, @Optional() protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);

        this._currentStyle = {
            "minHeight": this._height ? this._height : "320px",
            "height": this._height ? this._height : "320px"
        };
    }

    protected async createWidget(): Promise<Infront.InfrontWidget> {
        var infront = await this.infrontUIService.getInfront();
        this._widgetOptions.chartUI.advancedParameters = true;
        var widget = infront.chartWidget2(this.targetElement.nativeElement, this._widgetOptions);

        this.targetElement.nativeElement.parentElement.addEventListener('gridsterResizedWidget', (e) => {
            if (this.widget["initialized"]) {
                setTimeout(() => { this.widget.resizeWidget(); }, 300);
            }
        });

        return widget;
    }

    public resizeWidget() {
        if (this.widget) {
            this.widget.resizeWidget();
        }
    }

    public addInstrument(instrument) {
        if (this.widget) {
            this.widget.customAddInstrument(instrument);
        }
    }

    public updateOptions(options: Highcharts.UIoptions) {
        this._widgetOptions.chartUI = options;
        this.widget.updateMenuSettings(options);
    }

    //async recreateWidget() {

    //    super.recreateWidget();
    //}

    public setPeriod(period: Infront.HistoricalPeriod) {
        this.widget.periodSelected(period, true);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // ignore resize events as long as an chart.resizeWidget execution is in the queue
        if (!this.resizeTimeout) {
            this.resizeTimeout = setTimeout(() => {
                this.resizeTimeout = null;
                this.resizeWidget();

                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    }

}
