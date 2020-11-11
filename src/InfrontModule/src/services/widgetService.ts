import { Injectable , Optional}  from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
//import { Http, Headers } from '@angular/http';

@Injectable()
export class WidgetService {
    constructor(@Optional() private router: Router) {

    }

    public isPaused = new Infront.Observable();

    public alertUpdated = new Infront.Observable();

    private updateSnapshotSubject = new Subject<void>();
    
    public shouldUpdateSnapshot = this.updateSnapshotSubject.asObservable();

    public getWidgetPath: () => string = () => {
        if (this.router) {
            return this.router.url;
        } else {
            return undefined;
        }
    };

    public updateAllWidgets() {
        this.updateSnapshotSubject.next();
    }
}
