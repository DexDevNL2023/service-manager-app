import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SectionType} from "../enums/SectionType";
import {LiteSectionContent} from "../models/LiteSectionContent";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetailsApiService {
    private apiUrl = environment.baseUrl + '/home-service/public/details/';

    constructor(private http: HttpClient) {}

    getDetailsSection(sectionId: number, type: SectionType): Observable<LiteSectionContent> {
        return this.http.get<LiteSectionContent>(this.apiUrl + 'section/' + sectionId + '/' + type);
    }
}
