import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {PageContent} from "../models/PageContent";
import {MenuContent} from "../models/MenuContent";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private isLandingPageActiveSubject = new BehaviorSubject<boolean>(true);
    isLandingPageActive$ = this.isLandingPageActiveSubject.asObservable();
    private pageContentSource = new BehaviorSubject<any>(null);
    homePageContent$ = this.pageContentSource.asObservable();

    setMenuPageContent(menContent: MenuContent) {
        this.pageContentSource.next(menContent);
    }

    setLandingPageState(isActive: boolean) {
        this.isLandingPageActiveSubject.next(isActive);
    }
}
