import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SectionType} from "../enums/SectionType";
import {environment} from "../../../environments/environment";
import {DetailsContent} from "../models/DetailsContent";

@Injectable({
  providedIn: 'root'
})
export class DetailsApiService {
    private apiUrl = environment.baseUrl + '/home-service/public/details/';

    constructor(private http: HttpClient) {}

    getDetailsSection(sectionId: number, type: SectionType): Observable<DetailsContent> {
        return this.http.get<DetailsContent>(this.apiUrl + 'section/' + sectionId + '/' + type);
    }
}
