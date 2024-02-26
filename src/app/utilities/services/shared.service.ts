import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HomePageContent} from "../models/HomePageContent";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private isLandingPageActiveSubject = new BehaviorSubject<boolean>(true);
    isLandingPageActive$ = this.isLandingPageActiveSubject.asObservable();
    private homePageContentSource = new BehaviorSubject<any>(null);
    homePageContent$ = this.homePageContentSource.asObservable();

    setHomePageContent(content: HomePageContent) {
        this.homePageContentSource.next(content);
    }

    setLandingPageState(isActive: boolean) {
        this.isLandingPageActiveSubject.next(isActive);
    }
}
