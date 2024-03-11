import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
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
import {ContactType} from "../../utilities/enums/ContactType";
import {SectionSubMenuContent} from "../../utilities/models/SectionSubMenuContent";
import {ContactContent} from "../../utilities/models/ContactContent";
import {PageService} from "../../utilities/services/page.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    pageContent: PageContent | undefined;
    sections: SectionContent[] = [];
    contacts: ContactContent[] = [];

    career: CareerContent = { id: 1, job: 'Ordered', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true };
    offer: OfferContent = { id: 3, name: 'Build your mobile app', price: '10$', period: '30$', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true };
    partner: PartnerContent = { id: 1, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true };

    type: SectionType | undefined;
    sectionId: number | undefined;
    responsiveOptions: any[] | undefined;
    currentDate = new Date();
    isBannerVisible = true;
    dropdownVisible = false;

    constructor(private location: Location, private route: ActivatedRoute, private router: Router, private detailsApiService: DetailsApiService, private generalUtilsService: GeneralUtilsService, private pageService: PageService) { }

    ngOnInit(): void {
        AOS.init();

        // Abonnez-vous aux observables du service pour mettre à jour les données
        this.pageService.pageContent$.subscribe(pageContent => {
            this.pageContent = pageContent;
        });

        this.pageService.contacts$.subscribe(contacts => {
            this.contacts = contacts;
        });

        this.pageService.sections$.subscribe(sections => {
            this.sections = sections;
        });

        const target = document.querySelector('.tw')
        const writer = new Typewriter(target, {
            loop: true,
            typeSpeed: 80,
            deleteSpeed: 80,
            typeColor: '#0066ba'
        })

        // Utilisez le tableau résultant pour la séquence d'écriture
        writer.strings(400, ...this.pageContent.bannerTitle).start();

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
        const scrollToSection = scrollTo || 'header';

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
        // Utilisez le service pour mettre à jour les données
        this.pageService.updatePage(this.pageContent, null, null);

        this.router.navigate(['/register']);
    }

    // Définissez une fonction pour naviguer vers le composant de connexion
    navigateToLogin(): void {
        // Utilisez le service pour mettre à jour les données
        this.pageService.updatePage(this.pageContent, null, null);

        this.router.navigate(['/login']);
    }

    getCareerTypeLabelHtml(type: CareerType): string {
        return this.generalUtilsService.getCareerTypeLabel(type);
    }

    getSeverityHtml(date: string, time: string): string {
        return this.generalUtilsService.getSeverity(date, time);
    }

    generateLabelHtml(label): string {
        return this.generalUtilsService.generateLabelContent(label);
    }

    getPartnerTypeLabelHtml(type: PartnerType): string {
        return this.generalUtilsService.getPartnerTypeLabel(type);
    }
}
