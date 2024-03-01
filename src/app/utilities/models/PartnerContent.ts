import {PartnerType} from "../enums/PartnerType";

export class PartnerContent {
    id: number;
    name: string;
    sigle: string;
    about: string;
    type: PartnerType;
    contact: string;
    siteWeb: string;
    localization: string;
    logo: string;
    isVisible: boolean;
}
