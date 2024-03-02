import {SectionContent} from "./SectionContent";
import {PageContent} from "./PageContent";
import {ContactContent} from "./ContactContent";

export class MenuPageContent {
    pageContent: PageContent | undefined;
    sectionContents: SectionContent[] = [];
    contactContents: ContactContent[] = [];

    constructor(private page: PageContent, private sections: SectionContent[], contacts: ContactContent[]) {
        this.pageContent = page;
        this.sectionContents = sections;
        this.contactContents = contacts;
    }
}
