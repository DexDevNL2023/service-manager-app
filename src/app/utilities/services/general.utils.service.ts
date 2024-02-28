import { Injectable } from '@angular/core';
import {SectionType} from "../enums/SectionType";
import {PartnerType} from "../enums/PartnerType";
import {CareerType} from "../enums/CareerType";
import {Observable} from "rxjs";
import {LiteSectionContent} from "../models/LiteSectionContent";
import {ContactType} from "../enums/ContactType";
import {SectionContent} from "../models/SectionContent";

@Injectable({
  providedIn: 'root'
})
export class GeneralUtilsService {

  constructor() { }

    generateSeleton(typeString: string): string {
        switch (typeString) {
            case SectionType.ABOUT:
                return `
                    <div class="border-round border-1 surface-border p-4 surface-card">
                        <div class="flex mb-3">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                            <div>
                                <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                <p-skeleton height=".5rem" borderRadius="16px"></p-skeleton>
                            </div>
                        </div>
                        <p-skeleton width="100%" height="150px"></p-skeleton>
                        <div class="flex justify-content-between mt-3">
                            <p-skeleton width="4rem" height="2rem" borderRadius="16px"></p-skeleton>
                            <p-skeleton width="4rem" height="2rem" borderRadius="16px"></p-skeleton>
                        </div>
                    </div>
                `;
            case SectionType.CAREER:
                return `
                    <p-skeleton styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="10rem" height="4rem"></p-skeleton>

                    <p-skeleton styleClass="mb-2" borderRadius="16px"></p-skeleton>
                    <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                    <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                    <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                    <p-skeleton width="10rem" height="4rem" borderRadius="16px"></p-skeleton>
                `;
            case SectionType.CONTACT:
                return `
                    <div class="col-12 block md:flex center">
                        <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                        <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                        <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                        <p-skeleton shape="circle" size="5rem"></p-skeleton>
                    </div>
                `;
            case SectionType.OFFER:
                return `
                    <div class="border-round border-1 surface-border p-4 surface-card">
                        <ul class="m-0 p-0 list-none">
                            <li class="mb-3">
                                <div class="flex">
                                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                    <div style="flex: 1">
                                        <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                        <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3">
                                <div class="flex">
                                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                    <div style="flex: 1">
                                        <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                        <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3">
                                <div class="flex">
                                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                    <div style="flex: 1">
                                        <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                        <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="flex">
                                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                    <div style="flex: 1">
                                        <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                        <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;
            case SectionType.PARTNER:
                return `
                    <p-table [value]="defaultSections" [tableStyle]="{ 'min-width': '50rem' }">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Name</th>
                                <th>Adresses</th>
                                <th>Phone number</th>
                                <th>Web site</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-defaultSection>
                            <tr>
                                <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                            </tr>
                        </ng-template>
                    </p-table>
                `;
            case 'DETAILS':
                return `
                    <div *ngIf="type === 'ABOUT'" id="abouts" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center">
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">ABO</span>
                                <span class="text-blue-600">UTS</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">We provide you with the best advisors for your success.</span>
                        <div [innerHTML]="generateSeleton('ABOUT')"></div>
                    </div>

                    <div *ngIf="type === 'CAREER'" id="careers" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" style="background-color: #0066ba26 !important;" >
                        <div class="mb-3 font-bold text-2xl">
                            <span class="text-blue-600">CAR</span>
                            <span class="text-900">EERS</span>
                        </div>
                        <span class="text-700 text-sm line-height-3">Find job offers tailored to your professional goals.</span>
                        <div [innerHTML]="generateSeleton('CAREER')"></div>
                    </div>

                    <div *ngIf="type === 'OFFER'" id="offers" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" >
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">O</span>
                                <span class="text-blue-600">FFER</span>
                                <span class="text-900">S</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">Highlight your services using the most popular digital platform.</span>
                        <div [innerHTML]="generateSeleton('OFFER')"></div>
                    </div>

                    <div *ngIf="type === 'PARTNER'" id="partners" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" style="background-color: #0066ba26 !important;" >
                        <div class="mb-3 font-bold text-2xl">
                            <span class="text-blue-600">PAR</span>
                            <span class="text-900">RTN</span>
                            <span class="text-blue-600">ERS</span>
                        </div>
                        <span class="text-700 text-sm line-height-3">Become partners and benefit.</span>
                        <div [innerHTML]="generateSeleton('PARTNER')"></div>
                    </div>

                    <div *ngIf="type === 'CONTACT'" id="contacts" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" >
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">CO</span>
                                <span class="text-blue-600">NT</span>
                                <span class="text-900">AC</span>
                                <span class="text-blue-600">TS</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">We are at your service 24h/24 and 7j/7.</span>
                        <div [innerHTML]="generateSeleton('CONTACT')"></div>
                    </div>
                `;
            case 'HOME':
                return `
                    <div class="grid">
                        <div class="col-12 md:col-4 mb-4 px-5" data-aos="fade-up" data-aos-duration="2300">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-home text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Web site Service Manager</div>
                            <span class="text-700 text-sm line-height-3">The first services and jobs referencing site.</span>
                        </div>
                        <div class="col-12 md:col-4 mb-4 px-5" data-aos="fade-up" data-aos-duration="2500">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-info text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Abouts</div>
                            <span class="text-700 text-sm line-height-3">We provide you with the best advisors for your success.</span>
                        </div>
                        <div class="col-12 md:col-4 mb-4 px-5" data-aos="fade-up" data-aos-duration="3000">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-briefcase text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Careers</div>
                            <span class="text-700 text-sm line-height-3">Find job offers tailored to your professional goals.</span>
                        </div>
                        <div class="col-12 md:col-4 mb-4 px-5" data-aos="fade-up" data-aos-duration="2300">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-gift text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Offers</div>
                            <span class="text-700 text-sm line-height-3">Highlight your services using the most popular digital platform.</span>
                        </div>
                        <div class="col-12 md:col-4 mb-4 px-5" data-aos="fade-up" data-aos-duration="2500">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-users text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Partners</div>
                            <span class="text-700 text-sm line-height-3">Become partners and benefit.</span>
                        </div>
                        <div class="col-12 md:col-4 md:mb-4 mb-0 px-3" data-aos="fade-up" data-aos-duration="3000">
                            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                                <i class="pi pi-envelope text-4xl text-blue-500"></i>
                            </span>
                            <div class="text-900 mb-3 font-medium">Contacts</div>
                            <span class="text-700 text-sm line-height-3">We are at your service 24h/24 and 7j/7.</span>
                        </div>
                    </div>
                `;
            default:
                return `
                    <div id="abouts" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" >
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">ABO</span>
                                <span class="text-blue-600">UTS</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">We provide you with the best advisors for your success.</span>
                        <div class="border-round border-1 surface-border p-4 surface-card">
                            <div class="flex mb-3">
                                <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                <div>
                                    <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                    <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                    <p-skeleton height=".5rem" borderRadius="16px"></p-skeleton>
                                </div>
                            </div>
                            <p-skeleton width="100%" height="150px"></p-skeleton>
                            <div class="flex justify-content-between mt-3">
                                <p-skeleton width="4rem" height="2rem" borderRadius="16px"></p-skeleton>
                                <p-skeleton width="4rem" height="2rem" borderRadius="16px"></p-skeleton>
                            </div>
                        </div>
                    </div>

                    <div id="careers" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" style="background-color: #0066ba26 !important;" >
                        <div class="mb-3 font-bold text-2xl">
                            <span class="text-blue-600">CAR</span>
                            <span class="text-900">EERS</span>
                        </div>
                        <span class="text-700 text-sm line-height-3">Find job offers tailored to your professional goals.</span>
                        <p-skeleton styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="10rem" height="4rem"></p-skeleton>

                        <p-skeleton styleClass="mb-2" borderRadius="16px"></p-skeleton>
                        <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                        <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                        <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                        <p-skeleton width="10rem" height="4rem" borderRadius="16px"></p-skeleton>
                    </div>

                    <div id="offers" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" >
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">O</span>
                                <span class="text-blue-600">FFER</span>
                                <span class="text-900">S</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">Highlight your services using the most popular digital platform.</span>
                        <div class="border-round border-1 surface-border p-4 surface-card">
                            <ul class="m-0 p-0 list-none">
                                <li class="mb-3">
                                    <div class="flex">
                                        <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                        <div style="flex: 1">
                                            <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                            <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li class="mb-3">
                                    <div class="flex">
                                        <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                        <div style="flex: 1">
                                            <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                            <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li class="mb-3">
                                    <div class="flex">
                                        <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                        <div style="flex: 1">
                                            <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                            <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex">
                                        <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                                        <div style="flex: 1">
                                            <p-skeleton width="100%" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                                            <p-skeleton width="75%" borderRadius="16px"></p-skeleton>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="partners" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" style="background-color: #0066ba26 !important;" >
                        <div class="mb-3 font-bold text-2xl">
                            <span class="text-blue-600">PAR</span>
                            <span class="text-900">RTN</span>
                            <span class="text-blue-600">ERS</span>
                        </div>
                        <span class="text-700 text-sm line-height-3">Become partners and benefit.</span>
                        <p-table [value]="defaultSections" [tableStyle]="{ 'min-width': '50rem' }">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th>Name</th>
                                    <th>Adresses</th>
                                    <th>Phone number</th>
                                    <th>Web site</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-defaultSection>
                                <tr>
                                    <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                    <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                    <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                    <td><p-skeleton borderRadius="16px"></p-skeleton></td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>

                    <div id="contacts" class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center" >
                        <p-divider layout="horizontal" styleClass="hidden md:flex" [align]="'center'">
                            <div class="mb-3 font-bold text-2xl">
                                <span class="text-900">CO</span>
                                <span class="text-blue-600">NT</span>
                                <span class="text-900">AC</span>
                                <span class="text-blue-600">TS</span>
                            </div>
                        </p-divider>
                        <span class="text-700 text-sm line-height-3">We are at your service 24h/24 and 7j/7.</span>
                        <div class="col-12 block md:flex center">
                            <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                            <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                            <p-skeleton shape="circle" size="5rem" styleClass="mr-2"></p-skeleton>
                            <p-skeleton shape="circle" size="5rem"></p-skeleton>
                        </div>
                    </div>
                `;
        }
    }

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
