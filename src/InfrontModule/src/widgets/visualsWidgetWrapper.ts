import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, Optional } from '@angular/core';
import { InfrontUIService } from '../services/InfrontUI';

declare function require(name:string);
let ps = require('perfect-scrollbar');

export abstract class VisualsWidgetWrapper implements InterLibraryLink.Target {

    protected widget: any;
    protected visual: any;

    @ViewChild('targetElement') targetElement: ElementRef;

    @Input() widgetOptions: any;
    @Input() scrollable: boolean;


    constructor(protected infrontUIService: InfrontUIService) {
        this.visual = this.infrontUIService.getVisual();
    }
    
    protected abstract async createWidget(): Promise<any>;

    protected destroyLinkedFields;


    accepts = () => {
        return [InterLibraryLink.DataType.isin, InterLibraryLink.DataType.infrontInstrument, InterLibraryLink.DataType.infinInstrument, InterLibraryLink.DataType.universeObject];
    }

    receiveMessage = (msg) => {
        if (msg.type == InterLibraryLink.DataType.infrontInstrument && msg.value) {
            msg.type = InterLibraryLink.DataType.isin;
            msg.value = msg.value.isin;
        }
        if (this.widget && InfrontUtil.isFunction(this.widget.receiveMessage))
            this.widget.receiveMessage(msg);
    };

    async ngOnChanges() {
        if (this.widget) {
            while (this.targetElement.nativeElement.firstChild) {
                this.targetElement.nativeElement.removeChild(this.targetElement.nativeElement.firstChild);
            }
            this.destroyLinkedFields ? this.destroyLinkedFields() : null;
            if (InfrontUtil.isFunction(this.widget.destroy)) {
                this.widget.destroy();
            }
            this.widget = null;
        }

        if (this.widgetOptions) {
            this.widget = await this.createWidget();

            if (this.widgetOptions.linkChannels) {
                InterLibraryLink.ControllerLinkFactory.getInstance(this.widgetOptions.linkChannels).link(this);
            }

            if (this.scrollable) {
                this.targetElement.nativeElement.parentElement.style.display = "block";
                this.targetElement.nativeElement.classList.add("wt-widget-scrollable");
                this.targetElement.nativeElement.parentElement.parentElement.classList.add("wt-cell-content--scrollable");
                new ps(this.targetElement.nativeElement.parentElement, {
                    wheelSpeed: 0.8,
                    minScrollbarLength: 20
                });
            }
        }
    }

    ngOnDestroy() {
        if (this.widget) {
            while (this.targetElement.nativeElement.firstChild) {
                this.targetElement.nativeElement.removeChild(this.targetElement.nativeElement.firstChild);
            }
            this.destroyLinkedFields ? this.destroyLinkedFields() : null;
            InterLibraryLink.ControllerLinkFactory.getInstance(this.widgetOptions.linkChannels).unlink(this);
            if (InfrontUtil.isFunction(this.widget.destroy)) {
                this.widget.destroy();
            }
        }
    }
}
