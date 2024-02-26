import {PartnerContent} from "./PartnerContent";

export class OfferContent {
    id: number;
    name: string;
    description: string;
    images: string[] = [];
    partenaire: PartnerContent;
    isVisible: boolean;
}
