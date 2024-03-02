import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {PageContent} from "../models/PageContent";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private isLandingPageActiveSubject = new BehaviorSubject<boolean>(true);
    isLandingPageActive$ = this.isLandingPageActiveSubject.asObservable();
    private pageContentSource = new BehaviorSubject<any>(null);
    homePageContent$ = this.pageContentSource.asObservable();

    setHomePageContent(content: PageContent) {
        this.pageContentSource.next(content);
    }

    setLandingPageState(isActive: boolean) {
        this.isLandingPageActiveSubject.next(isActive);
    }
}
