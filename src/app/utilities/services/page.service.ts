import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PageContent} from "../models/PageContent";
import {SectionContent} from "../models/SectionContent";
import {ContactContent} from "../models/ContactContent";

@Injectable({
  providedIn: 'root'
})
export class PageService {
    private pageContentSource = new BehaviorSubject<PageContent | undefined>(undefined);
    private sectionsSource = new BehaviorSubject<SectionContent[]>([]);
    private contactsSource = new BehaviorSubject<ContactContent[]>([]);

    pageContent$ = this.pageContentSource.asObservable();
    sections$ = this.sectionsSource.asObservable();
    contacts$ = this.contactsSource.asObservable();

    updatePage(pageContent: PageContent | undefined, sections: SectionContent[], contacts: ContactContent[]): void {
        this.pageContentSource.next(pageContent);
        this.sectionsSource.next(sections);
        this.contactsSource.next(contacts);
    }
}
