import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  shownSource = false;

  constructor(private httpClient: HttpClient) { }

  public getInfrontAuthToken(url: string): Observable<TokenResponse> {
    return this.httpClient.get<TokenResponse>(url);
  }

  shownSourcePopup() {
    this.shownSource = true;
  }

  getShownSource() {
    return this.shownSource;
  }
}

export interface TokenResponse {
  links: string[];
  metadata: string[];
  result: Token;

}
export interface Token {
  access_token: string;
}
