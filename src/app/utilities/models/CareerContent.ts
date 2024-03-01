import {CareerType} from "../enums/CareerType";
import {LitePartnerContent} from "./LitePartnerContent";

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
    partenaire: LitePartnerContent;
    isVisible: boolean;
}
