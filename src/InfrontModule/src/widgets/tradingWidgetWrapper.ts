import { Component, Input, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, Optional } from '@angular/core';
import { InfrontUIService } from '../services/InfrontUI';
import { WidgetService } from '../services/widgetService';
import { BaseWidgetWrapper } from './baseWidgetWrapper';

export abstract class TradingWidgetWrapper extends BaseWidgetWrapper {
    constructor(protected ref: ChangeDetectorRef, protected infrontUIService: InfrontUIService, protected widgetService: WidgetService) {
        super(infrontUIService, widgetService);
    }

    ngOnDestroy() {
        this.ref.detach();
    }
}