import {PartnerContent} from "./PartnerContent";
import {CareerType} from "../enums/CareerType";

export class CareerContent {
    id: number;
    job: string;
    type: CareerType;
    description: string;
    missions: string;
    jobRequirements: string;
    applicantProfile: string;
    applicationDocuments: string;
    appyInstructions: string;
    dateLimite: string;
    heureLimite: string;
    partenaire: PartnerContent;
    isVisible: boolean;
}
