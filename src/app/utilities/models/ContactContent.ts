import {ContactType} from "../enums/ContactType";

export class ContactContent {
    id: number;
    name: string;
    description: string;
    type: ContactType
    image: string;
    isVisible: boolean;
}
