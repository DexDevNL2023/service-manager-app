import {SectionType} from "../enums/SectionType";
import {AboutContent} from "./AboutContent";
import {CareerContent} from "./CareerContent";
import {ContactContent} from "./ContactContent";
import {OfferContent} from "./OfferContent";
import {PartnerContent} from "./PartnerContent";

export class SectionContent {
    key: string;
    target: string;
    label: string;
    description: string;
    isVisible: boolean;
    type: SectionType;
    abouts: AboutContent[] = [];
    careers: CareerContent[] = [];
    contacts: ContactContent[] = [];
    offers: OfferContent[] = [];
    partners: PartnerContent[] = [];
}
