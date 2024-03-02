import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from "../../utilities/services/shared.service";
import {DetailsApiService} from "../../utilities/services/details.api.service";
import {SectionType} from "../../utilities/enums/SectionType";
import {CareerContent} from "../../utilities/models/CareerContent";
import {OfferContent} from "../../utilities/models/OfferContent";
import {PartnerContent} from "../../utilities/models/PartnerContent";
import {GeneralUtilsService} from "../../utilities/services/general.utils.service";
import {SectionContent} from "../../utilities/models/SectionContent";
import AOS from 'aos';
import Typewriter from 't-writer.js';
import {DetailsContent} from "../../utilities/models/DetailsContent";
import {CareerType} from "../../utilities/enums/CareerType";
import {PartnerType} from "../../utilities/enums/PartnerType";
import {PageContent} from "../../utilities/models/PageContent";
import {MenuPageContent} from "../../utilities/models/MenuPageContent";
import {ContactType} from "../../utilities/enums/ContactType";
import {SectionSubMenuContent} from "../../utilities/models/SectionSubMenuContent";
import {ContactContent} from "../../utilities/models/ContactContent";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    pageContent: PageContent = {
        name: 'Nom de votre site',
        description: 'Description de votre site',
        hexaCouleurTheme: '#293782f3',
        bannerImageUrl: '../../../assets/layout/images/landing/about-section-image.png',
        bannerTitle: 'Service Manager, The first services and jobs referencing site.',
        bannerDescription: 'Découvrez ce que nous avons à offrir, Premier segment, Deuxième segment, Troisième segment',
        logoUrl: '../../../assets/layout/images/logo-white.png',
        faviconUrl: '../../../assets/layout/images/favicon-white.ico',
        footerTitle: 'Titre du pied de page de votre site',
        footerDescription: 'Description du pied de page de votre site',
    };
    sections: SectionContent[] = [
        { key: 'homes', label: 'Home', description: 'Everything you need to find the service you need. The first services and jobs referencing site.', icon: 'pi pi-home', submenu:[], type: SectionType.HOME, isVisible: true },
        { key: 'abouts', label: 'About', description: 'We provide you with the best advisors for your success.', icon: 'pi pi-info', submenu:[], type: SectionType.ABOUT, isVisible: true },
        { key: 'careers', label: 'Careers', description: 'Find job offers tailored to your professional goals.', icon: 'pi pi-briefcase', submenu:[], type: SectionType.CAREER, isVisible: true },
        { key: 'offers', label: 'Offers', description: 'Highlight your services using the most popular digital platform.', icon: 'pi pi-gift', submenu:[
                { label: 'IT Graphik', description: 'Porta lorem mollis aliquam ut porttitor leo a diam.', isVisible: true },
                { label: 'DeVops', description: 'Amet purus gravida quis blandit.', isVisible: true },
                { label: 'Big Data', description: 'Aenean vel elit scelerisque mauris.', isVisible: true },
                { label: 'Development Application', description: 'Aenean vel elit scelerisque mauris.', isVisible: true },
                { label: 'Courses', description: 'Feugiat pretium nibh ipsum consequat.', isVisible: true },
                { label: 'Documentation', description: 'Tristique nulla aliquet enim tortor.', isVisible: true },
                { label: 'API Reference', description: 'Feugiat pretium nibh ipsum consequat.', isVisible: true }
            ], type: SectionType.OFFER, isVisible: true
        },
        { key: 'partners', label: 'Partners', description: 'Become partners and benefit.', icon: 'pi pi-users', submenu:[], type: SectionType.PARTNER, isVisible: true },
        { key: 'contacts', label: 'Contacts', description: 'We are at your service 24h/24 and 7j/7.', icon: 'pi pi-envelope', submenu:[], type: SectionType.CONTACT, isVisible: true },
    ];
    contacts: ContactContent[] = [
        { type: ContactType.WHATSAPP, value: '+123456789', isVisible: true },
        { type: ContactType.FACEBOOK, value: '@prime_ng', isVisible: true },
        { type: ContactType.PHONE, value: '+123456789', isVisible: true },
        { type: ContactType.TWITTER, value: '@prime_ng', isVisible: true },
        { type: ContactType.EMAIL, value: 'contact@primetek.com.tr', isVisible: true },
        { type: ContactType.FAX, value: '+123456789', isVisible: true }
    ];
    career: CareerContent = { id: 1, job: 'Ordered', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true };
    offer: OfferContent = { id: 3, name: 'Build your mobile app', price: '10$', period: '30$', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true };
    partner: PartnerContent = { id: 1, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true };

    sectionId: number | undefined;
    type: SectionType | undefined;
    responsiveOptions: any[] | undefined;
    currentDate = new Date();
    isBannerVisible = true;
    dropdownVisible = false;

    constructor(private location: Location, private sharedService: SharedService, private detailsApiService: DetailsApiService, private route: ActivatedRoute, private router: Router, private generalUtilsService: GeneralUtilsService) { }

    ngOnInit(): void {
        AOS.init();

        const target = document.querySelector('.tw')
        const writer = new Typewriter(target, {
            loop: true,
            typeSpeed: 80,
            deleteSpeed: 80,
            typeColor: '#0066ba'
        })

        // Utilisez le tableau résultant pour la séquence d'écriture
        writer.strings(400, ...this.pageContent.bannerTitle).start();

        // Utilisez cette méthode pour changer l'état de la Landing Page
        this.sharedService.setLandingPageState(true);

        // Récupère homePageContent du service partagé
        this.sharedService.homePageContent$.subscribe((data: MenuPageContent) => {
            this.pageContent = data.pageContent;
            this.sections = data.sectionContents;
            this.contacts = data.contactContents;

            // Ajoutez les titres dynamiques à partir de homePageContent.bannerTitle
            if (this.pageContent && this.pageContent.bannerTitle) {
                writer.strings(400, ...this.pageContent.bannerTitle).start();
            }
        });

        this.route.paramMap.subscribe(params => {
            // Récupérez la représentation de chaîne de l'enum depuis les paramètres de l'URL
            this.sectionId = +params.get('id');
            const typeString = params.get('type');

            // Convertissez la chaîne en enum dans le type approprié (SectionType)
            this.type = SectionType[typeString as keyof typeof SectionType];
            this.loadSectionDetails();
        });

        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '1220px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '1100px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        window.addEventListener('popstate', () => {
            this.goBackToParentComponent();
        });
    }

    ngOnDestroy(): void {
        window.removeEventListener('popstate', this.goBackToParentComponent);
    }

    // Récupérez du contenu dynamique depuis le backend
    loadSectionDetails() {
        this.detailsApiService.getDetailsSection(this.sectionId, this.type).subscribe((data: DetailsContent) => {
            this.career = data.career;
            this.offer = data.offer;
            this.partner = data.partner;
        });
    }

    closeBanner(): void {
        this.isBannerVisible = false;
    }

    goToHome(scrollTo: string): void {
        // Vérifiez si scrollTo est défini, sinon définissez une valeur par défaut
        const scrollToSection = scrollTo || 'home';

        // Naviguez vers DetailsComponent avec les paramètres de l'URL
        this.router.navigate(['/home', scrollToSection]);
    }

    goBackToParentComponent(): void {
        this.location.back();
    }

    isSectionEnabled(section: SectionContent): boolean {
        return section.isVisible;
    }

    isSectionSubMenuEnabled(submenu: SectionSubMenuContent): boolean {
        return submenu.isVisible;
    }

    toggleDropdown(): void {
        this.dropdownVisible = !this.dropdownVisible;
    }

    getContactIcon(type: ContactType) {
        return this.generalUtilsService.getContactIcon(type)
    }

    getContactAction(contact: string, type: ContactType) {
        return this.generalUtilsService.getContactAction(contact, type)
    }

    // Définissez une fonction pour naviguer vers le composant d'inscription
    navigateToRegister(): void {
        this.router.navigate(['/register']);
    }

    // Définissez une fonction pour naviguer vers le composant de connexion
    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }

    private generateCareerCardContent(career: CareerContent, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        return `
            <p-divider align="center" type="dotted">
                <h1 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${this.generalUtilsService.getSectionTypeLabel(type).toUpperCase()}</h1>
            </p-divider>
            <div [ngIf]="${career.partenaire}">
                <img [ngIf]="${career.partenaire.logo}" [ngSrc]="${career.partenaire.logo}" alt="${career.job}" class="w-6 shadow-2" [preview]="true" />
                <p-divider align="center" type="dotted">
                    <h3 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${career.partenaire.name.toUpperCase()}</h3>
                </p-divider>
                <p-tag [value]="${career.partenaire.siteWeb ? career.partenaire.siteWeb : career.partenaire.contact}" severity="secondary"></p-tag>
            </div>
            <div [ngIf]="${career.job}">
                <p-divider align="left" type="solid">
                    <b>Job</b>
                </p-divider>
                <p class="m-0">
                    <b>${career.job}</b>
                    ${this.generalUtilsService.getCareerTypeLabel(career.type)}
                </p>
            </div>
            <div [ngIf]="${career.description}">
                <p-divider align="left" type="solid">
                    <b>Description</b>
                </p-divider>
                <p class="m-0">
                    ${career.description}
                </p>
            </div>
            <div [ngIf]="${career.missions}">
                <p-divider align="left" type="solid">
                    <b>Missions</b>
                </p-divider>
                <p class="m-0">
                    ${career.missions}
                </p>
            </div>
            <div [ngIf]="${career.jobRequirements}">
                <p-divider align="left" type="solid">
                    <b>Job requirements</b>
                </p-divider>
                <p class="m-0">
                    ${career.jobRequirements}
                </p>
            </div>
            <div [ngIf]="${career.applicantProfile}">
                <p-divider align="left" type="solid">
                    <b>Applicant profile</b>
                </p-divider>
                <p class="m-0">
                    ${career.applicantProfile}
                </p>
            </div>
            <div [ngIf]="${career.applicationDocuments}">
                <p-divider align="left" type="solid">
                    <b>Application documents</b>
                </p-divider>
                <p class="m-0">
                    ${career.applicationDocuments}
                </p>
            </div>
            <div [ngIf]="${career.appyInstructions}">
                <p-divider align="left" type="solid">
                    <b>Appy instructions</b>
                </p-divider>
                <p class="m-0">
                    ${career.appyInstructions}
                </p>
            </div>
            <div [ngIf]="${career.dateLimite}">
                <p-divider align="left" type="solid">
                    <b>Deadline</b>
                </p-divider>
                <p class="m-0">
                    <p-tag [value]="Deadline ${career.dateLimite} at ${career.heureLimite}" [severity]="${this.generalUtilsService.getSeverity(career.dateLimite, career.heureLimite)}"></p-tag>
                </p>
            </div>
            <p-divider></p-divider>
            <p-button label="Back" icon="pi pi-arrow-left" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }" (click)="goBackToParentComponent()"></p-button>
       `;
    }

    private generateOfferCardContent(offer: OfferContent, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        return `
            <p-divider align="center" type="dotted">
                <h1 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${this.generalUtilsService.getSectionTypeLabel(type).toUpperCase()}</h1>
            </p-divider>
            <div [ngIf]="${offer.partenaire}">
                <img [ngIf]="${offer.partenaire.logo}" [ngSrc]="${offer.partenaire.logo}" alt="${offer.name}" class="w-6 shadow-2" [preview]="true" />
                <p-divider align="center" type="dotted">
                    <h3 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${offer.partenaire.name.toUpperCase()}</h3>
                </p-divider>
                <p-tag [value]="${offer.partenaire.siteWeb ? offer.partenaire.siteWeb : offer.partenaire.contact}" severity="secondary"></p-tag>
            </div>
            <div [ngIf]="${offer.name}">
                <p-divider align="left" type="solid">
                    <b>${offer.name}</b>
                </p-divider>
                <div [ngIf]="${offer.images}">
                    <p-galleria [(value)]="${offer.images}" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                        <ng-template let-image pTemplate="item">
                            <img [src]="image" style="width: 100%; display: block;" />
                        </ng-template>
                    </p-galleria>
                </div>
            </div>
            <div [ngIf]="${offer.description}">
                <p-divider align="left" type="solid">
                    <b>Description</b>
                </p-divider>
                <p class="m-0">
                    ${offer.description}
                </p>
            </div>
            <p-divider></p-divider>
            <p-button label="Back" icon="pi pi-arrow-left" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }" (click)="goBackToParentComponent()"></p-button>
       `;
    }

    private generatePartnerCardContent(partner: PartnerContent, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        return `
            <p-divider align="center" type="dotted">
                <h1 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${this.generalUtilsService.getSectionTypeLabel(type).toUpperCase()}</h1>
            </p-divider>
            <img [ngIf]="${partner.logo}" [ngSrc]="${partner.logo}" alt="${partner.name}" class="w-6 shadow-2" [preview]="true" />
            <p-divider align="center" type="dotted">
                <h3 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${partner.name.toUpperCase()}</h3>
            </p-divider>
            <p-tag [value]="${partner.siteWeb}" severity="secondary"></p-tag>
            <p-tag [value]="${partner.contact}" severity="secondary"></p-tag>
            <div [ngIf]="${partner.sigle}">
                <p-divider align="left" type="solid">
                    <b>Sigle</b>
                </p-divider>
                <p class="m-0">
                    <b>${partner.sigle}</b>
                    ${this.generalUtilsService.getPartnerTypeLabel(partner.type)}
                </p>
            </div>
            <div [ngIf]="${partner.about}">
                <p-divider align="left" type="solid">
                    <b>About</b>
                </p-divider>
                <p class="m-0">
                    ${partner.about}
                </p>
            </div>
            <div [ngIf]="${partner.localization}">
                <p-divider align="left" type="solid">
                    <b>Localization</b>
                </p-divider>
                <p class="m-0">
                    ${partner.localization}
                </p>
            </div>
            <p-divider></p-divider>
            <p-button label="Back" icon="pi pi-arrow-left" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }" (click)="goBackToParentComponent()"></p-button>
       `;
    }
}
