import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HomePageContent} from "../models/HomePageContent";

@Injectable({
    providedIn: 'root'
})
export class HomeApiService {
    private apiUrl = 'http://localhost:8888/home-service/public';

    constructor(private http: HttpClient) {}

    getSections(): Observable<HomePageContent> {
        return this.http.get<HomePageContent>(`${this.apiUrl}/build/home-page`);
    }
}
