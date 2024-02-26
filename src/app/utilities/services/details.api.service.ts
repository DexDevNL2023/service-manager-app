import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SectionType} from "../enums/SectionType";
import {LiteSectionContent} from "../models/LiteSectionContent";

@Injectable({
  providedIn: 'root'
})
export class DetailsApiService {
    private apiUrl = 'http://localhost:8888/home-service/public';

    constructor(private http: HttpClient) {}

    getDetailsSection(sectionId: number, type: SectionType): Observable<LiteSectionContent> {
        return this.http.get<LiteSectionContent>(`${this.apiUrl}/details/section/${sectionId}/${type}`);
    }
}
