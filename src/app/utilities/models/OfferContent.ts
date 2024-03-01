import {LitePartnerContent} from "./LitePartnerContent";

export class OfferContent {
    id: number;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    subscriptionMessage: string;
    partenaire: LitePartnerContent;
    isVisible: boolean;
}
