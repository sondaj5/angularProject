// profile.service.ts
import { Injectable, Optional } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient) { }

    getProfile() {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get('/profile', { headers });
    }
}
