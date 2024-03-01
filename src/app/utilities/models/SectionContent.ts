import {SectionType} from "../enums/SectionType";
import {SectionSubMenuContent} from "./SectionSubMenuContent";

export class SectionContent {
    key: string;
    label: string;
    description: string;
    icon: string;
    submenu: SectionSubMenuContent[];
    type: SectionType;
    isVisible: boolean;
}
