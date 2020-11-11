import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, Optional } from '@angular/core';
import { InfrontUIService } from '../services/InfrontUI';
import { WidgetService } from '../services/widgetService';
import * as ps from 'perfect-scrollbar';
import { Subscription } from 'rxjs';

declare function require(name: string);

export abstract class BaseWidgetWrapper {

    @ViewChild('targetElement') targetElement: ElementRef;

    protected _widgetOptions: any;
    @Input()
    set widgetOptions(widgetOptions: any) {
        this._widgetOptions = widgetOptions;
        this.recreateWidget();
    };
    @Input() style: string;
    @Input() scrollable: boolean;
    @Input('pause')
    set pause(value: boolean) {
        if (this.widgetService) {
            this.widgetService.isPaused.set(value);
        } else if (this.widget) {
            value ? this.widget.pause() : this.widget.resume();
        }
    }


    protected widgetPath: string[] = [];
    protected changeCount: number = 0;

    protected widget: Infront.InfrontWidget;
    protected _hidden: boolean;

    private isRecreating: boolean

    private updateSubscription: Subscription;

    get hidden() {
        return this._hidden;
    }

    constructor(protected infrontUIService: InfrontUIService, protected widgetService: WidgetService) {
        let binding = new Infront.ObservableBinding();

        binding.valueUpdated = (isPaused) => {
            if (this.widget && isPaused) {
                this.widget.pause();
            } else if (this.widget && !isPaused) {
                this.widget.resume();
            }
        };

        if (widgetService) {
            this.widgetService.isPaused.observe(binding);
            this.updateSubscription = this.widgetService.shouldUpdateSnapshot.subscribe(() => {
                if (this.widget && this.widget['updateAllInstruments']) {
                    this.widget['updateAllInstruments']();
                }
            })
        }
    }

    protected abstract async createWidget(): Promise<Infront.InfrontWidget>;

    async recreateWidget() {
        if (this.isRecreating) {
            //InfrontUtil.setZeroTimeout(() => {
            //    this.setWidget();
            //});
        }
        else {
            this.setWidget();
        }

    }

    private async setWidget() {

        this.widgetPath = [];

        if (this.widgetService) {
            let routerPath = this.widgetService.getWidgetPath();
            if (routerPath) {
                this.widgetPath.push(routerPath);
            }
        }
        if (this.widget) {
            this.widget.destroy();
        }

        if (this._widgetOptions) {

            this.isRecreating = true;

            if (!this._widgetOptions.storageType) {
                this._widgetOptions.storageType = this.widgetPath;
            }
            this.createWidget().then(widget => {
                this.widget = widget;
                if (this.scrollable) {
                    this.targetElement.nativeElement.parentElement.style.display = "block";
                    this.targetElement.nativeElement.classList.add("wt-widget-scrollable");
                    this.targetElement.nativeElement.parentElement.style.height = "100%";
                    this.targetElement.nativeElement.parentElement.parentElement.classList.add("wt-cell-content--scrollable");
                    console.warn(ps);
                    // ps.initialize(this.targetElement.nativeElement.parentElement, {
                    //     wheelSpeed: 0.8,
                    //     minScrollbarLength: 20
                    // });
                }

                this.isRecreating = false;
            });
        }
    }

    ngOnDestroy() {
        if (this.widget) {
            this.widget.destroy();
        }
    }
}
