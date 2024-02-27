import {SectionContent} from "./SectionContent";
import {SectionType} from "../enums/SectionType";

export class HomePageContent {
    name: string;
    hexaCouleurTheme: string; // Example hex color code : '#3498db'
    bannerImageUrl: string;
    bannerTitle: string;
    bannerDescription: string;
    logoUrl: string;
    faviconUrl: string;
    footerTitle: string;
    footerDescription: string;
    sections: SectionContent[] = [];
}
