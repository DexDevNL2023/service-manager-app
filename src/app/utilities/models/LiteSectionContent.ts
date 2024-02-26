import {SectionType} from "../enums/SectionType";
import {AboutContent} from "./AboutContent";
import {CareerContent} from "./CareerContent";
import {ContactContent} from "./ContactContent";
import {OfferContent} from "./OfferContent";
import {PartnerContent} from "./PartnerContent";
import {HomePageContent} from "./HomePageContent";

export class LiteSectionContent {
    type: SectionType;
    about: AboutContent;
    career: CareerContent;
    contact: ContactContent;
    offer: OfferContent;
    partner: PartnerContent;
}
