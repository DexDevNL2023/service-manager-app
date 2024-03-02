import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MenuPageContent} from "../models/MenuPageContent";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private isLandingPageActiveSubject = new BehaviorSubject<boolean>(true);
    isLandingPageActive$ = this.isLandingPageActiveSubject.asObservable();
    private menPageContentSource = new BehaviorSubject<any>(null);
    menPageContent$ = this.menPageContentSource.asObservable();

    setMenuPageContent(menPageContent: MenuPageContent) {
        this.menPageContentSource.next(menPageContent);
    }

    setLandingPageState(isActive: boolean) {
        this.isLandingPageActiveSubject.next(isActive);
    }
}
