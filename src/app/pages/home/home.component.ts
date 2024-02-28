import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../utilities/services/shared.service";
import {Router, RouterLink} from "@angular/router";
import {HomeApiService} from "../../utilities/services/home.api.service";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {HomePageContent} from "../../utilities/models/HomePageContent";
import {SectionContent} from "../../utilities/models/SectionContent";
import {SectionType} from "../../utilities/enums/SectionType";
import {AboutContent} from "../../utilities/models/AboutContent";
import {CareerContent} from "../../utilities/models/CareerContent";
import {ContactContent} from "../../utilities/models/ContactContent";
import {OfferContent} from "../../utilities/models/OfferContent";
import {PartnerContent} from "../../utilities/models/PartnerContent";
import {CarouselModule} from "primeng/carousel";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {GeneralUtilsService} from "../../utilities/services/general.utils.service";
import {DividerModule} from "primeng/divider";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import AOS from 'aos';
import Typewriter from 't-writer.js';
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";
import {MenubarModule} from "primeng/menubar";
import {ScrollTopModule} from "primeng/scrolltop";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterLink,
        NgStyle,
        NgForOf,
        NgIf,
        CarouselModule,
        CardModule,
        ButtonModule,
        NgOptimizedImage,
        DividerModule,
        SkeletonModule,
        TableModule,
        AvatarModule,
        ToolbarModule,
        MenubarModule,
        ScrollTopModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    homePageContent: HomePageContent | undefined;
    sections: SectionContent[] | undefined;
    responsiveOptions: any[] | undefined;
    loading: boolean = true;
    currentDate = new Date();
    defaultSections: any[] | undefined;
    isBannerVisible = true;
    menuItems = [
        { label: 'Home', icon: 'pi pi-home', command: () => this.scrollTo('home') },
        { label: 'About', icon: 'pi pi-info', command: () => this.scrollTo('abouts') },
        { label: 'Careers', icon: 'pi pi-briefcase', command: () => this.scrollTo('careers') },
        { label: 'Offers', icon: 'pi pi-gift', command: () => this.scrollTo('offers') },
        { label: 'Partners', icon: 'pi pi-users', command: () => this.scrollTo('partners') },
        { label: 'Contacts', icon: 'pi pi-envelope', command: () => this.scrollTo('contacts') },
    ];
    // Assurez-vous que homePageContent.bannerTitle est défini avant d'utiliser ce code
    bannerTitles: string[] = ["Service Manager", "App"];

    constructor(private sharedService: SharedService, private homeApiService: HomeApiService, private router: Router, private generalUtilsService: GeneralUtilsService) {}

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

        // Récupérez du contenu dynamique depuis le backend
        this.homeApiService.getSections().subscribe((data: HomePageContent) => {
            this.homePageContent = data;
            this.sections = data.sections;

            // Ajoutez les titres dynamiques à partir de homePageContent.bannerTitle
            if (this.homePageContent && this.homePageContent.bannerTitle) {
                this.bannerTitles.push(...this.homePageContent.bannerTitle.split(','));
            }

            // Construisez le tableau menuItems
            this.menuItems = this.sections
                .filter(section => this.isSectionEnabled(section))
                .map(section => ({
                    label: section.label,
                    icon: this.generalUtilsService.getSectionIcon(section.type),
                    command: () => this.scrollTo(`${section.key}`),
                }));

            this.loading = false;
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

    getSectionIcon(section: SectionContent) {
        return this.generalUtilsService.getSectionIcon(section.type)
    }

    closeBanner(): void {
        this.isBannerVisible = false;
    }

    scrollTo(elementId: string): void {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    isSectionEnabled(section: SectionContent): boolean {
        // Déterminer si la section est activée ou désactivée
        return section.isVisible;
    }

    generateSectionContent(section: SectionContent): string {
        switch (section.type) {
            case SectionType.ABOUT:
                return this.generateAboutCardContent(section.abouts, section.label, section.description, section.type);
            case SectionType.CAREER:
                return this.generateCareerCardContent(section.careers, section.label, section.description, section.type);
            case SectionType.CONTACT:
                return this.generateContactCardContent(section.contacts, section.label, section.description, section.type);
            case SectionType.OFFER:
                return this.generateOfferCardContent(section.offers, section.label, section.description, section.type);
            case SectionType.PARTNER:
                return this.generatePartnerCardContent(section.partners, section.label, section.description, section.type);
            default:
                return '';
        }
    }

    private viewDetails(item: any, type: SectionType): void {
        // Convertissez SectionType en chaîne pour l'URL
        const typeString = SectionType[type];

        // Naviguez vers DetailsComponent avec les paramètres de l'URL
        this.sharedService.setHomePageContent(this.homePageContent);
        this.router.navigate(['/details', item.id, typeString]);
    }

    private generateAboutCardContent(abouts: AboutContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generateLabelContent(label);
        const defaultText = this.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const timeLineItems = abouts.map(about => `
            <ng-template pTemplate="marker" let-event>
                <span class="custom-marker shadow-2" [style.backgroundColor]="${this.homePageContent.hexaCouleurTheme}">
                    <i [ngIf]="${about.icon}" [ngClass]="${about.icon}"></i>
                </span>
            </ng-template>
            <ng-template pTemplate="content" let-event>
                <p-card [header]="${about.title.toUpperCase()}" [subheader]="${about.subTitle}" [style]="{ width: '640px' }" [ngStyle]="{ color: ${this.homePageContent.hexaCouleurTheme} }">
                    <p-galleria [ngIf]="${about.images}" [(value)]="${about.images}" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                        <ng-template let-image pTemplate="item">
                            <img [src]="image" [alt]="${about.title}" width="200" class="shadow-2" [preview]="true" />
                        </ng-template>
                    </p-galleria>
                    <p style="line-height: 1.5">${about.description}</p>
                    <p-button label="Read more" icon="pi pi-chevron-right" style="background-color: ${this.homePageContent.hexaCouleurTheme}; color: white;" (click)="viewDetails(${about.id}, ${type})"></p-button>
                </p-card>
            </ng-template>
        `);
        return `
            ${labelHtml}
            <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
            <p-timeline [ngIf]="${abouts}" [value]="${abouts}" align="alternate" styleClass="customized-timeline">
              ${timeLineItems.join('\n')}
            </p-timeline>
        `;
    }

    private generateCareerCardContent(careers: CareerContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generateLabelContent(label);
        const defaultText = this.getDefaultText(type);

        const carouselItems = careers.map(career => `
            <ng-template let-partner pTemplate="item">
              <p-card header="${career.job.toUpperCase()}" subheader="${this.generalUtilsService.getCareerTypeLabel(career.type)}" [style]="{ width: '640px' }" [ngStyle]="{ color: ${this.homePageContent.hexaCouleurTheme} }">
                <ng-template pTemplate="header">
                  <img [ngIf]="${career.partenaire.logo}" [ngSrc]="${career.partenaire.logo}" alt="${career.job}" class="w-6 shadow-2" [preview]="true" />
                </ng-template>
                <ng-template pTemplate="content">
                  <p style="line-height: 1.5">${this.generalUtilsService.getCareerTypeLabel(career.type)}</p>
                  <p-tag [value]="Deadline ${career.dateLimite} at ${career.heureLimite}" [severity]="${this.generalUtilsService.getSeverity(career.dateLimite, career.heureLimite)}"></p-tag>
                </ng-template>
                <ng-template pTemplate="footer">
                  <p-button label="View More" icon="pi pi-chevron-right" style="background-color: ${this.homePageContent.hexaCouleurTheme}; color: white;" (click)="viewDetails(${career.id}, ${type})"></p-button>
                </ng-template>
              </p-card>
            </ng-template>
        `);
        return `
            ${labelHtml}
            <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
            <p-carousel [ngIf]="${careers}" [value]="${careers}" [numScroll]="3" [circular]="true" [responsiveOptions]="responsiveOptions">
              ${carouselItems.join('\n')}
            </p-carousel>
        `;
    }

    private generateContactCardContent(contacts: ContactContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generateLabelContent(label);
        const defaultText = this.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        return contacts.map(contact => {
            let contactAction = this.generalUtilsService.getActionContact(contact.description, contact.type); // Variable pour stocker l'action associée au contact

            // Vérifiez si contactAction est une chaîne vide
            const showButton = contactAction !== '';

            return `
            ${labelHtml}
            <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
            <p-fieldset>
                <ng-template pTemplate="header">
                    <div class="flex align-items-center gap-2 px-2">
                        <p-avatar [ngIf]="${contact.image}" image="${contact.image}" shape="circle" />
                        <span class="font-bold" style="color: ${this.homePageContent.hexaCouleurTheme}">${contact.name.toUpperCase()}</span>
                    </div>
                </ng-template>
                <p class="m-0">
                    ${contact.description}
                </p>
                ${showButton ? `
                <p-button label="Contact us" style="color: ${this.homePageContent.hexaCouleurTheme}" [text]="true" [raised]="true" [plain]="true" (click)="${contactAction}"></p-button>` : ''}
            </p-fieldset>`;
        }).join('');
    }

    private generateOfferCardContent(offers: OfferContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generateLabelContent(label);
        const defaultText = this.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const carouselItems = offers.map(offer => `
          <p-galleria [ngIf]="${offer.images}" [(value)]="${offer.images}" [autoPlay]="true" [circular]="true" [responsiveOptions]="${this.responsiveOptions}" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
               <ng-template let-image pTemplate="item">
                   <img [ngIf]="image" [ngSrc]="image" style="width: 100%; display: block;" />
               </ng-template>
               <ng-template let-image pTemplate="thumbnail">
                   <div class="grid grid-nogutter justify-content-center">
                        <img [ngIf]="image" [ngSrc]="image" style="display: block;" />
                   </div>
               </ng-template>
               <ng-template pTemplate="caption" let-item>
                   <h4 style="margin-bottom: .5rem; color: #ffffff;">{${offer.name.toUpperCase()}</h4>
                   <p style="line-height: 1.5">${offer.partenaire.siteWeb ? offer.partenaire.siteWeb : offer.partenaire.contact}</p>
                   <p-button label="View More" icon="pi pi-chevron-right" style="background-color: ${this.homePageContent.hexaCouleurTheme}; color: white;" (click)="viewDetails(${offer.id}, ${type})"></p-button>
               </ng-template>
          </p-galleria>
        `);
        return `
            ${labelHtml}
            <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
            <p-carousel [ngIf]="${offers}" [value]="${offers}" [numVisible]="3" [numScroll]="3" [responsiveOptions]="responsiveOptions">
              ${carouselItems.join('\n')}
            </p-carousel>
        `;
    }

    private generatePartnerCardContent(partners: PartnerContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generateLabelContent(label);
        const defaultText = this.getDefaultText(type);

        const carouselItems = partners.map(partner => `
            <ng-template let-partner pTemplate="item">
              <p-card header="${partner.name.toUpperCase()}" subheader="${this.generalUtilsService.getPartnerTypeLabel(partner.type)}" [style]="{ width: '360px' }" [ngStyle]="{ color: ${this.homePageContent.hexaCouleurTheme} }">
                <ng-template pTemplate="header">
                  <img [ngIf]="${partner.logo}" [ngSrc]="${partner.logo}" alt="${partner.name}" class="w-6 shadow-2" [preview]="true" />
                </ng-template>
                <ng-template pTemplate="content">
                  <p-tag [value]="${partner.siteWeb ? partner.siteWeb : partner.contact}" severity="secondary"></p-tag>
                </ng-template>
                <ng-template pTemplate="footer">
                  <p-button label="View More" icon="pi pi-chevron-right" style="background-color: ${this.homePageContent.hexaCouleurTheme}; color: white;" (click)="viewDetails(${partner.id}, ${type})"></p-button>
                </ng-template>
              </p-card>
            </ng-template>
        `);
        return `
            ${labelHtml}
            <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
            <p-carousel [ngIf]="${partners}" [value]="${partners}" [numVisible]="3" [numScroll]="3" [circular]="true" [responsiveOptions]="responsiveOptions" autoplayInterval="3000">
              ${carouselItems.join('\n')}
            </p-carousel>
        `;
    }

}
