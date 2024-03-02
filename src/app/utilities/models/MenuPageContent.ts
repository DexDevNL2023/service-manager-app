import {SectionContent} from "./SectionContent";
import {PageContent} from "./PageContent";

export class MenuPageContent {
    pageContent: PageContent | undefined;
    sectionContents: SectionContent[] = [];

    constructor(private page: PageContent, private sections: SectionContent[]) {
        this.pageContent = page;
        this.sectionContents = sections;
    }
}
