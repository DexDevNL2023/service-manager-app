import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from "../../utilities/services/shared.service";
import {DetailsApiService} from "../../utilities/services/details.api.service";
import {SectionType} from "../../utilities/enums/SectionType";
import {AboutContent} from "../../utilities/models/AboutContent";
import {CareerContent} from "../../utilities/models/CareerContent";
import {OfferContent} from "../../utilities/models/OfferContent";
import {PartnerContent} from "../../utilities/models/PartnerContent";
import {LiteSectionContent} from "../../utilities/models/LiteSectionContent";
import {GeneralUtilsService} from "../../utilities/services/general.utils.service";
import {HomePageContent} from "../../utilities/models/HomePageContent";
import {SectionContent} from "../../utilities/models/SectionContent";
import AOS from 'aos';
import Typewriter from 't-writer.js';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    homePageContent: HomePageContent | undefined;
    responsiveOptions: any[] | undefined;
    loading: boolean = true;
    currentDate = new Date();
    defaultSections: any[] | undefined;
    isBannerVisible = true;
    menuItems = [
        { label: 'Home', icon: 'pi pi-home', command: () => this.goToHome('home') },
        { label: 'About', icon: 'pi pi-info', command: () => this.goToHome('abouts') },
        { label: 'Careers', icon: 'pi pi-briefcase', command: () => this.goToHome('careers') },
        { label: 'Offers', icon: 'pi pi-gift', command: () => this.goToHome('offers') },
        { label: 'Partners', icon: 'pi pi-users', command: () => this.goToHome('partners') },
        { label: 'Contacts', icon: 'pi pi-envelope', command: () => this.goToHome('contacts') },
    ];
    // Assurez-vous que homePageContent.bannerTitle est défini avant d'utiliser ce code
    bannerTitles: string[] = ["Service Manager", "App"];
    defaultColor: string = '#293782f3';

    sectionId: number | undefined;
    type: SectionType | undefined;
    detailsSection: LiteSectionContent | undefined;

    constructor(private location: Location, private sharedService: SharedService, private detailsApiService: DetailsApiService, private route: ActivatedRoute, private router: Router, private generalUtilsService: GeneralUtilsService) { }

    ngOnInit(): void {
        this.loading = true;
        AOS.init();
        this.defaultSections = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);

        const target = document.querySelector('.tw')
        const writer = new Typewriter(target, {
            loop: true,
            typeSpeed: 80,
            deleteSpeed: 80,
            typeColor: '#0066ba'
        })

        // Utilisez le tableau résultant pour la séquence d'écriture
        writer.strings(400, ...this.bannerTitles).start();

        // Utilisez cette méthode pour changer l'état de la Landing Page
        this.sharedService.setLandingPageState(true);

        // Récupère homePageContent du service partagé
        this.sharedService.homePageContent$.subscribe((content) => {
            this.homePageContent = content;

            // Ajoutez les titres dynamiques à partir de homePageContent.bannerTitle
            if (this.homePageContent && this.homePageContent.bannerTitle) {
                this.bannerTitles.push(...this.homePageContent.bannerTitle.split(','));
            }

            // Construisez le tableau menuItems
            this.menuItems = content.sections
                .filter(section => this.isSectionEnabled(section))
                .map(section => ({
                    label: section.label,
                    icon: this.generalUtilsService.getSectionIcon(section.type),
                    command: () => this.goToHome(`${section.key}`),
                }));
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

    generateSeleton(typeString: string) {
        return this.generalUtilsService.generateSeleton(typeString)
    }

    isSectionEnabled(section: SectionContent): boolean {
        // Déterminer si la section est activée ou désactivée
        return section.isVisible;
    }

    // Récupérez du contenu dynamique depuis le backend
    loadSectionDetails() {
        this.detailsApiService.getDetailsSection(this.sectionId, this.type).subscribe(data => {
            this.detailsSection = data;
            this.loading = false;
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

    generateSectionContent(section: LiteSectionContent): string {
        switch (section.type) {
            case SectionType.ABOUT:
                return this.generateAboutCardContent(section.about, section.type);
            case SectionType.CAREER:
                return this.generateCareerCardContent(section.career, section.type);
            case SectionType.CONTACT:
                // Ne rien faire
            case SectionType.OFFER:
                return this.generateOfferCardContent(section.offer, section.type);
            case SectionType.PARTNER:
                return this.generatePartnerCardContent(section.partner, section.type);
            default:
                return '';
        }
    }

    private generateAboutCardContent(about: AboutContent, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        return `
            <p-divider align="center" type="dotted">
                <h1 [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">${this.generalUtilsService.getSectionTypeLabel(type).toUpperCase()}</h1>
            </p-divider>
            <div [ngIf]="${about.images}">
                <p-galleria [(value)]="${about.images}" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                    <ng-template let-image pTemplate="item">
                        <img [src]="image" style="width: 100%; display: block;" />
                    </ng-template>
                </p-galleria>
            </div>
            <div [ngIf]="${about.title}">
                <p-divider align="left" type="solid">
                    <b>${about.title}</b>
                </p-divider>
                <p class="m-0">
                    ${about.description}
                </p>
            </div>
            <p-divider></p-divider>
            <p-button label="Back" icon="pi pi-arrow-left" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }" (click)="goBackToParentComponent()"></p-button>
       `;
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