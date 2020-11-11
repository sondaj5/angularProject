import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { InfrontUIService } from './InfrontUI';

interface UserSettings {
    currency: string,
    language: string,
    numberFormat: string,
    theme: string,
    orderConfirmation: boolean,
    topBarActive: boolean,
    soundNotification: boolean,
}

/** Service class handling authorization and retrieving user data */
@Injectable()
export class UserService {
    public loggedIn: boolean;
    public infront: Infront.UI;
    public loginResult: Observable<LoginResult>;
    private settingsSubscription: Subscription;

    private _userSettings: UserSettings;
    private _url: string;
    private _headers: HttpHeaders;

    constructor(private http: HttpClient, private infrontUIService: InfrontUIService) {
        this._setUserSettings();
    }

    private _setUserSettings(): Promise<UserSettings> {
        this._headers = new HttpHeaders({ 'X-Requested-With': "XMLHttpRequest" });
        this._url = '/a/Settings/GetUserSettings';
        return new Promise((resolve, reject) => {
            this.http.post(this._url, null, { headers: this._headers })
                .subscribe((userSettings: UserSettings) => {
                    if (!userSettings)
                        reject("No user settings found");
                    else
                        this._userSettings = userSettings;
                    resolve();
                });
        });
    }

    public saveUserSettings(data: UserSettings): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.http.post('/a/Settings/SetUserSettings', data, { headers: this._headers }).subscribe(({ error_code }: { error_code: number }) => {
                if (error_code == 0) {
                    resolve();
                } else {
                    reject("Settings were not saved");
                }
            });
        
        });
    }

    get userSettings(): Promise<UserSettings> {
        return (async () => {
            await this._setUserSettings();
            return this._userSettings;
        })();
    }


    getInfront() {
        return this.infront;
    }

    login(username: String, password: String, callback: () => void){

    }

    logout() {
        this.loggedIn = false;
    }

    isLoggedIn(succeedCallback, failedCallback:() => void): boolean {
        if (this.loggedIn) {
            return true;
        }
        else {
            failedCallback();
        }
    }

    establishInfrontSession(loginResult: LoginResult, callback:()=>void){
            
    }

    reconnectInfrontSession(succeedCallback: () => void, failedCallback: () => void) {

    }

    loginErrorMessage(msg: String) {

    }



    ngOnDestroy() {
        if (this.settingsSubscription) {
            this.settingsSubscription.unsubscribe();
        }
    }
}

export class LoginResult {
    session_token: string;
    session_urls: string[];
    session_user: string;
    session_pw: string;
    routing_response: string;
    success: boolean;
    error_message: string;
}
