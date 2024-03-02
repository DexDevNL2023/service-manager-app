import {SectionContent} from "./SectionContent";
import {HomeContent} from "./HomeContent";
import {AboutContent} from "./AboutContent";
import {CareerContent} from "./CareerContent";
import {OfferContent} from "./OfferContent";
import {PartnerContent} from "./PartnerContent";
import {ContactContent} from "./ContactContent";
import {PageContent} from "./PageContent";

export class LandingContent {
    pageContent: PageContent | undefined;
    sections: SectionContent[] = [];
    homes: HomeContent[] = [];
    abouts: AboutContent[] = [];
    careers: CareerContent[] = [];
    offers: OfferContent[] = [];
    partners: PartnerContent[] = [];
    contacts: ContactContent[] = [];
}
