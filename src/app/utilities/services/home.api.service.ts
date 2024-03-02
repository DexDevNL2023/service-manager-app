import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {LandingContent} from "../models/LandingContent";

@Injectable({
    providedIn: 'root'
})
export class HomeApiService {
    private apiUrl = environment.baseUrl + '/home-service/public/';

    constructor(private http: HttpClient) {}

    getSections(): Observable<LandingContent> {
        return this.http.get<LandingContent>(this.apiUrl + `build/home-page`);
    }
}
