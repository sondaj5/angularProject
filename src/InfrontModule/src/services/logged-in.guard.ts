// logged-in-guard.ts
import { Injectable, Optional } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private user: UserService, private router: Router) { }

    canActivate() {

        var succeedCallback = () => {
            this.router.navigate([window.location.pathname]);
        };

        var failedCallback = () => {
            this.router.navigate(["/login"]);
        };

        return this.user.isLoggedIn(succeedCallback, failedCallback);
    }
}
