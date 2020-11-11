import { Input, Component, Output, OnChanges, ViewChild, ElementRef, EventEmitter, Optional, ChangeDetectorRef } from '@angular/core';
import { InfrontUIService } from '../../services/InfrontUI';
import { BaseWidgetWrapper } from '../baseWidgetWrapper';


@Component({
    selector: 'infrontswitch',
    template: '<div #targetElement class="wt-switch"> </div>',
})

export class Switch {
    private widget: Infront.Switch;
    @ViewChild('targetElement') targetElement: ElementRef;
    @Output() stateChangedEvent = new EventEmitter<boolean>();
    @Input() initialState: boolean;

    private something2: boolean;

    constructor(private infrontUIService: InfrontUIService, private ref: ChangeDetectorRef) {
        this.ref.detectChanges();

    }

    ngOnInit() {
        var onStateChange = (state: boolean) => {
            if (this.stateChangedEvent)
                this.stateChangedEvent.emit(state);
        }

        this.widget = new Infront.Switch(this.targetElement.nativeElement, onStateChange, this.initialState, '');
    }

    ngOnChanges() {

        if (this.widget) this.widget.setState(this.initialState);
    }
}
