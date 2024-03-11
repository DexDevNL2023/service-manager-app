import {Injectable} from '@angular/core';
import {SectionType} from "../enums/SectionType";
import {PartnerType} from "../enums/PartnerType";
import {CareerType} from "../enums/CareerType";
import {ContactType} from "../enums/ContactType";

@Injectable({
  providedIn: 'root'
})
export class GeneralUtilsService {

  constructor() { }

    getDefaultText(type: SectionType): string {
        let defaultText: string;

        switch (type) {
            case SectionType.ABOUT:
                defaultText = 'We provide you with the best advisors for your success.';
                break;
            case SectionType.CAREER:
                defaultText = 'Find job offers tailored to your professional goals.';
                break;
            case SectionType.OFFER:
                defaultText = 'Highlight your services using the most popular digital platform.';
                break;
            case SectionType.PARTNER:
                defaultText = 'Become partners and benefit.';
                break;
            case SectionType.CONTACT:
                defaultText = 'We are at your service 24h/24 and 7j/7.';
                break;
            default:
                defaultText = '';
                break;
        }

        return defaultText;
    }

    generateLabelContent(label: string): string {
        // Découper le label en blocs aléatoires de 2, 3 ou 4 lettres
        const pieces = [];
        let currentIndex = 0;

        while (currentIndex < label.length) {
            const blockSize = this.getRandomBlockSize();
            const block = label.substr(currentIndex, blockSize);
            const textStyle = currentIndex % 2 === 0 ? 'text-900' : 'text-blue-600';
            pieces.push(`<span class="${textStyle}">${block}</span>`);
            currentIndex += blockSize;
        }

        // Assembler les morceaux dans un p-divider
        return `<p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
            <div class="mb-3 font-bold text-2xl">${pieces.join('')}</div>
          </p-divider>`;
    }

    getRandomBlockSize(): number {
        // Retourner une taille de bloc aléatoire entre 2, 3 ou 4
        return [2, 3, 4][Math.floor(Math.random() * 3)];
    }

    getColorByIndex(index: number): string {
        // Logique pour déterminer la couleur en fonction de l'index
        return index % 2 === 0 ? '#0066ba26 !important' : '#ffffff';
    }

    getContactAction(contact: string, type: ContactType): string {
        // Déterminez l'action en fonction du type de contact
        switch (type) {
            case ContactType.EMAIL:
                return `window.location.href = 'mailto:${contact}'`;
            case ContactType.FAX:
                // Ajoutez ici l'action pour le fax
                return '';
            case ContactType.PHONE:
                return `window.location.href = 'tel:${contact}'`;
            case ContactType.WHATSAPP:
                return `window.open('https://wa.me/${contact}', '_blank')`;
            case ContactType.FACEBOOK:
                return `window.open('https://www.facebook.com/${contact}', '_blank')`;
            case ContactType.TWITTER:
                return `window.open('https://twitter.com/${contact}', '_blank')`;
        }
    }

    getContactIcon(type: ContactType): string {
        switch (type) {
            case ContactType.PHONE:
                return 'pi pi-phone';
            case ContactType.WHATSAPP:
                return 'pi pi-whatsapp';
            case ContactType.FAX:
                return 'pi pi-paperclip';
            case ContactType.EMAIL:
                return 'pi pi-envelope';
            case ContactType.TWITTER:
                return 'pi pi-twitter';
            case ContactType.FACEBOOK:
                return 'pi pi-facebook';
            default:
                return '';
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
