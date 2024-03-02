import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MenuPageContent} from "../models/MenuPageContent";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private isLandingPageActiveSubject = new BehaviorSubject<boolean>(true);
    isLandingPageActive$ = this.isLandingPageActiveSubject.asObservable();
    private pageContentSource = new BehaviorSubject<any>(null);
    homePageContent$ = this.pageContentSource.asObservable();

    setMenuPageContent(menPageContent: MenuPageContent) {
        this.pageContentSource.next(menPageContent);
    }

    setLandingPageState(isActive: boolean) {
        this.isLandingPageActiveSubject.next(isActive);
    }
}
