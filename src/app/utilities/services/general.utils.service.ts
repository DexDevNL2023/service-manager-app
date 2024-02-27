import { Injectable } from '@angular/core';
import {SectionType} from "../enums/SectionType";
import {PartnerType} from "../enums/PartnerType";
import {CareerType} from "../enums/CareerType";
import {Observable} from "rxjs";
import {LiteSectionContent} from "../models/LiteSectionContent";
import {ContactType} from "../enums/ContactType";

@Injectable({
  providedIn: 'root'
})
export class GeneralUtilsService {

  constructor() { }

    getActionContact(contact: string, type: ContactType): string {
        let contactAction = ''; // Variable pour stocker l'action associée au contact

        // Déterminez l'action en fonction du type de contact
        switch (type) {
            case ContactType.EMAIL:
                contactAction = `window.location.href = 'mailto:${contact}'`;
                break;
            case ContactType.FAX:
                // Ajoutez ici l'action pour le fax
                break;
            case ContactType.TELEPHONE:
                contactAction = `window.location.href = 'tel:${contact}'`;
                break;
            case ContactType.WHATSAPP:
                contactAction = `window.open('https://wa.me/${contact}', '_blank')`;
                break;
        }
        return contactAction;
    }

    getContactTypeLabel(type: ContactType): string {
        switch (type) {
            case ContactType.EMAIL:
                return "Adresse mail";
            case ContactType.FAX:
                return "Fax";
            case ContactType.TELEPHONE:
                return "Telephone";
            case ContactType.WHATSAPP:
                return "Whatsapp";
            default:
                return "";
        }
    }

    getSectionTypeLabel(type: SectionType): string {
        switch (type) {
            case SectionType.ABOUT:
                return "About";
            case SectionType.CAREER:
                return "Career";
            case SectionType.CONTACT:
                return "Contact";
            case SectionType.OFFER:
                return "Offer";
            case SectionType.PARTNER:
                return "Partner";
            default:
                return "";
        }
    }

    getPartnerTypeLabel(type: PartnerType): string {
        switch (type) {
            case PartnerType.PUBLIC:
                return "Institution publique";
            case PartnerType.PRIVEE:
                return "Institution privee";
            case PartnerType.PARTICULIER:
                return "Particulier";
            default:
                return "";
        }
    }

    getCareerTypeLabel(type: CareerType): string {
        switch (type) {
            case CareerType.CDI:
                return "Contrat à durée indéterminée (CDI)";
            case CareerType.CDD:
                return "Contrat à durée déterminée (CDD)";
            case CareerType.STAGE:
                return "Stage professionnel";
            default:
                return "";
        }
    }

    getSeverity(dateVar: string, timeVar: string): string {
        const deadline = `${dateVar}T${timeVar}`;
        const startDate = new Date();
        const endDate = new Date(deadline);

        // Calculer la différence de temps en millisecondes
        const differenceEnMillisecondes = endDate.getTime() - startDate.getTime();

        // Convertir les millisecondes en jours
        const differenceEnJours = Math.floor(differenceEnMillisecondes / (1000 * 60 * 60 * 24));

        switch (true) {
            case differenceEnJours <= 5:
                return 'warning';
            case differenceEnJours < 3:
                return 'danger';
            default:
                return 'success';
        }
    }

    getSectionIcon(type: SectionType) {
        switch (type) {
            case SectionType.ABOUT:
                return 'pi pi-info';
            case SectionType.CAREER:
                return 'pi pi-briefcase';
            case SectionType.OFFER:
                return 'pi pi-gift';
            case SectionType.PARTNER:
                return 'pi pi-users';
            case SectionType.CONTACT:
                return 'pi pi-envelope';
            default:
                return 'pi pi-home';
        }
    }
}
