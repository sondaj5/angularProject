import { Component, Input, OnChanges, ViewChild, ElementRef, Optional } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';

declare function require(name:string);
let ps = require('perfect-scrollbar');

@Component({
    selector: 'search',
    template: '<span #targetElement> </span>',
})

export class Search {
    private widget: Infront.SearchBox;
    @ViewChild('targetElement') targetElement: ElementRef;
    @Input() widgetOptions: any;

    constructor( private infrontUIService: InfrontUIService ) {
        
    }

    ngOnInit() {
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 70) { /* CTRL + F */
                e.preventDefault();
                if (this.widget)
                    this.widget.focus();
            }
        });
    }

    async ngOnChanges() {
        if (this.widget) {
            this.widget.destroy();
        }
        if (this.widgetOptions) {
            this.widgetOptions.dropdownUpdatedCallback = (dropdownContainer: HTMLElement) => { this.updateScrollbar(dropdownContainer) };
            this.infrontUIService.getInfront().then((infront) => {
                this.widget = new Infront.SearchBox(this.targetElement.nativeElement, infront.getModel(), this.widgetOptions);
            });
        }
    }

    updateScrollbar(element: HTMLElement) {
        new ps(element, {
            wheelSpeed: 0.8,
            minScrollbarLength: 20
        });
    }

    public focus() {
        if (this.widget)
            this.widget.focus();
    }

    public clear() {
        if (this.widget)
            this.widget.setText("", true);
    }
}

@Component({
    selector: 'simplesearch',
    template: '<div #targetElement> </div>',
})

export class SimpleSearch {
    private widget: Infront.SimpleSearchBox;
    @ViewChild('targetElement') targetElement: ElementRef;
    @Input() widgetOptions: any;

    constructor(private infrontUIService: InfrontUIService) {

    }

    ngOnInit() {
        window.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.keyCode === 70) { /* CTRL + F */
                e.preventDefault();
                //focusSearch();
            }
        });
    }

    async ngOnChanges() {
        if (this.widget) {
            this.widget.destroy();
        }
        if (this.widgetOptions) {
            this.infrontUIService.getInfront().then((infront) => {
                this.widget = new Infront.SimpleSearchBox(this.targetElement.nativeElement, infront.getModel(), this.widgetOptions);
            });
        }
    }
}
