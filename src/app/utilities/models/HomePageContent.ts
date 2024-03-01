import {SectionContent} from "./SectionContent";
import {SectionType} from "../enums/SectionType";
import {AboutContent} from "./AboutContent";
import {CareerContent} from "./CareerContent";
import {ContactContent} from "./ContactContent";
import {OfferContent} from "./OfferContent";
import {PartnerContent} from "./PartnerContent";

export class HomePageContent {
    name: string;
    description: string;
    hexaCouleurTheme: string; // Example hex color code : '#3498db'
    bannerImageUrl: string;
    bannerTitle: string;
    bannerDescription: string;
    logoUrl: string;
    faviconUrl: string;
    footerTitle: string;
    footerDescription: string;
    sections: SectionContent[];
    abouts: AboutContent[];
    careers: CareerContent[];
    contacts: ContactContent[];
    offers: OfferContent[];
    partners: PartnerContent[];
}
