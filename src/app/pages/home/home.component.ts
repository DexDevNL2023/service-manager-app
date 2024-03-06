import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {SharedService} from "../../utilities/services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeApiService} from "../../utilities/services/home.api.service";
import {SectionContent} from "../../utilities/models/SectionContent";
import {SectionType} from "../../utilities/enums/SectionType";
import {AboutContent} from "../../utilities/models/AboutContent";
import {CareerContent} from "../../utilities/models/CareerContent";
import {ContactContent} from "../../utilities/models/ContactContent";
import {OfferContent} from "../../utilities/models/OfferContent";
import {PartnerContent} from "../../utilities/models/PartnerContent";
import {GeneralUtilsService} from "../../utilities/services/general.utils.service";
import {SectionSubMenuContent} from "../../utilities/models/SectionSubMenuContent";
import {HomeContent} from "../../utilities/models/HomeContent";
import {CareerType} from "../../utilities/enums/CareerType";
import {ContactType} from "../../utilities/enums/ContactType";
import {MessageService} from "primeng/api";
import {PageContent} from "../../utilities/models/PageContent";
import {LandingContent} from "../../utilities/models/LandingContent";
import {MenuPageContent} from "../../utilities/models/MenuPageContent";
import {PartnerType} from "../../utilities/enums/PartnerType";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    pageContent: PageContent | undefined;
    sections: SectionContent[] = [];
    homes: HomeContent[] = [];
    abouts: AboutContent[] = [];
    careers: CareerContent[] = [];
    offers: OfferContent[] = [];
    partners: PartnerContent[] = [];
    contacts: ContactContent[] = [];
    responsiveOptions: any[] | undefined;
    currentDate = new Date();
    isBannerVisible = true;
    dropdownVisible = false;
    maxLength: number = 50;
    selectedSection: SectionContent;
    currentCarouselPage: number = 0;
    // Initialize properties to hold input values
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    messageText: string = '';

    constructor(private el: ElementRef, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private sharedService: SharedService, private homeApiService: HomeApiService, private generalUtilsService: GeneralUtilsService) {}

    ngOnInit(): void {
        console.log('run 1');
        this.initDefaultData();

        // Utilisez cette méthode pour changer l'état de la Landing Page
        console.log('run 2');
        this.sharedService.setLandingPageState(true);

        // Récupérer le paramètre 'scrollTo' de l'URL
        console.log('run 3');
        this.route.params.subscribe(params => {
            const scrollTo = params['scrollTo'];
            console.log(scrollTo);

            // Assurez-vous que scrollToSection est défini avant de faire défiler
            if (scrollTo) {
                // Faire défiler la page vers la section correspondante
                this.scrollTo(scrollTo);
            }
        });

        // Récupérez du contenu dynamique depuis le backend
        console.log('run 4');
        this.homeApiService.getSections().subscribe((data: LandingContent) => {
            this.pageContent = data.pageContent;
            console.log(this.pageContent);
            this.sections = data.sections;
            console.log(this.sections);
            this.homes = data.homes;
            console.log(this.homes);
            this.abouts = data.abouts;
            console.log(this.abouts);
            this.careers = data.careers;
            console.log(this.careers);
            this.offers = data.offers;
            console.log(this.offers);
            this.partners = data.partners;
            console.log(this.partners);
            this.contacts = data.contacts;
            console.log(this.contacts);
        });

        console.log('run 5');
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

    // Définissez une fonction pour naviguer vers le composant d'inscription
    navigateToRegister(): void {
        this.router.navigate(['/register']);
    }

    // Définissez une fonction pour naviguer vers le composant de connexion
    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }

    getCareerTypeLabelHtml(type: CareerType): string {
        return this.generalUtilsService.getCareerTypeLabel(type);
    }

    getSeverityHtml(date: string, time: string): string {
        return this.generalUtilsService.getSeverity(date, time);
    }

    toggleDropdown(section: SectionContent): void {
        this.selectedSection = section;
        this.dropdownVisible = !this.dropdownVisible;
    }

    generateLabelHtml(label): string {
        return this.generalUtilsService.generateLabelContent(label);
    }

    showSection(sectionKey: string): boolean {
        const sectionIndex = this.sections.findIndex(section => section.key === sectionKey);

        if (sectionIndex !== -1) {
            return this.sections[sectionIndex].isVisible = true;
        }

        return false;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        // Vérifiez si le clic n'est pas à l'intérieur de la section "Offers"
        if (!this.el.nativeElement.contains(event.target)) {
            this.dropdownVisible = false;
        }
    }

    getContactIcon(type: ContactType) {
        return this.generalUtilsService.getContactIcon(type)
    }

    getContactAction(contact: string, type: ContactType) {
        return this.generalUtilsService.getContactAction(contact, type)
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

    viewDetails(item: any, type: SectionType): void {
        // Convertissez SectionType en chaîne pour l'URL
        const typeString = SectionType[type];

        // En supposant que MenuPageContent prend pageContent et sections comme paramètres dans son constructeur
        const menuPage: MenuPageContent = new MenuPageContent(this.pageContent, this.sections, this.contacts);

        // Naviguez vers DetailsComponent avec les paramètres de l'URL
        this.sharedService.setMenuPageContent(menuPage);
        this.router.navigate(['/details', item.id, typeString]);
    }

    isSectionEnabled(section: SectionContent): boolean {
        return section.isVisible;
    }

    isSectionSubMenuEnabled(submenu: SectionSubMenuContent): boolean {
        return submenu.isVisible;
    }

    isHomeSectionEnabled(home: HomeContent): boolean {
        return home.isVisible;
    }

    isAboutSectionEnabled(about: AboutContent): boolean {
        return about.isVisible;
    }

    isCareerSectionEnabled(career: CareerContent): boolean {
        return career.isVisible;
    }

    isOfferSectionEnabled(offer: OfferContent): boolean {
        return offer.isVisible;
    }

    isPartnerSectionEnabled(partner: PartnerContent): boolean {
        return partner.isVisible;
    }

    isContactSectionEnabled(contact: ContactContent): boolean {
        return contact.isVisible;
    }

    isEven(index: number): boolean {
        return index % 2 === 0;
    }

    truncateDescription(description: string): string {
        if (description.length <= this.maxLength) {
            return description;
        } else {
            return description.slice(0, this.maxLength) + '...';
        }
    }

    openSearchCareers() {
        this.router.navigate(['/search-careers']);
    }

    openSearchOffers() {
        this.router.navigate(['/search-offers']);
    }

    onCarouselPageChange(event: any) {
        this.currentCarouselPage = event.page;
        console.log('Current Carousel Page:', this.currentCarouselPage);
    }

    sendMessage(): void {
        // Vérifiez si les champs requis sont remplis
        if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.messageText) {
            // Affichez un message d'erreur si l'un des champs requis est vide
            this.messageService.add({ severity: 'error', summary: 'Erreur de validation', detail: 'Veuillez remplir tous les champs requis.' });
            return;
        }

        // Votre logique pour envoyer le message va ici

        // Construisez l'objet de message de succès avec les saisies de l'utilisateur
        const messageSucces = {
            severity: 'success',
            summary: 'Message envoyé',
            detail: `Votre message a été envoyé avec succès. Détails : ${this.firstName}, ${this.lastName}, ${this.email}, ${this.phone}, ${this.messageText}`
        };

        // Affichez le message de succès
        this.messageService.add(messageSucces);
    }

    initDefaultData(): void {
        this.pageContent = {
            name: 'Nom de votre site',
            description: 'Description de votre site',
            hexaCouleurTheme: '#293782f3',
            bannerImageUrl: 'assets/layout/images/landing/about-section-image.png',
            bannerTitle: 'Service Manager, The first services and jobs referencing site.',
            bannerDescription: 'Découvrez ce que nous avons à offrir, Premier segment, Deuxième segment, Troisième segment',
            logoUrl: 'assets/layout/images/logo-white.png',
            faviconUrl: 'assets/layout/images/favicon-white.ico',
            footerTitle: 'Titre du pied de page de votre site',
            footerDescription: 'Description du pied de page de votre site',
        };
        console.log(this.pageContent);
        this.sections = [
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
        console.log(this.sections);
        this.homes = [
            { title: 'Home', icon: 'pi pi-home', description: 'The first services and jobs referencing site.', isVisible: true },
            { title: 'About', icon: 'pi pi-info', description: 'We provide you with the best advisors for your success.', isVisible: true },
            { title: 'Careers', icon: 'pi pi-briefcase', description: 'Find job offers tailored to your professional goals.', isVisible: true },
            { title: 'Offers', icon: 'pi pi-gift', description: 'Highlight your services using the most popular digital platform.', isVisible: true},
            { title: 'Partners', icon: 'pi pi-users', description: 'Become partners and benefit.', isVisible: true },
            { title: 'Contacts', icon: 'pi pi-envelope', description: 'We are at your service 24h/24 and 7j/7.', isVisible: true },
        ];
        console.log(this.homes);
        this.abouts = [
            { title: 'Ordered', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { title: 'Processing', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-cog', color: '#673AB7', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { title: 'Shipped', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-shopping-cart', color: '#FF9800', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { title: 'Delivered', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-check', color: '#607D8B', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
        ];
        console.log(this.abouts);
        this.careers = [
            { id: 1, job: 'Ordered', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 2, job: 'Processing', type: CareerType.CDD, description: 'Lorem ipr error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 3, job: 'Shipped', type: CareerType.STAGE, description: '', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 4, job: 'Delivered', type: CareerType.CDD, description: 'Lorem ipsuror repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 5, job: 'Ordered', type: CareerType.CDD, description: '', missions: '', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 6, job: 'Processing', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 7, job: 'Shipped', type: CareerType.CDI, description: '', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
            { id: 8, job: 'Delivered', type: CareerType.STAGE, description: '', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        ];
        console.log(this.careers);
        this.offers = [
            { id: 1, name: 'Build your web site', price: '10$', period: 'month', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
            { id: 2, name: 'DevOPS', price: '10$', period: 'Year', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Try Free', isVisible: true },
            { id: 3, name: 'Build your mobile app', price: '30$', period: 'Day', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 4, name: 'Basic', price: '10$', period: 'month', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 5, name: 'Premium', price: '10$', period: 'Year', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Try Free', isVisible: true },
            { id: 6, name: 'Enterprise', price: '10$', period: 'Day', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
            { id: 7, name: 'Basic', price: '10$', period: 'month', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 8, name: 'Premium', price: '10$', period: 'Year', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
            { id: 9, name: 'Enterprise', price: '10$', period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
        ];
        console.log(this.offers);
        this.partners = [
            { id: 1, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 2, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 3, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 4, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 5, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 6, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 7, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 8, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 9, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 10, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 11, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
            { id: 12, name: 'Partner 1', sigle: 'Partner 1', about: 'Partner 1', type: PartnerType.PRIVEE, contact: 'contact@partner1.com', siteWeb: 'www.partner1.com', localization: 'Awae escalier, yaounde cameroun', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
        ];
        console.log(this.partners);
        /*this.contacts = [
            { type: ContactType.WHATSAPP, value: '+123456789', isVisible: true },
            { type: ContactType.FACEBOOK, value: '@prime_ng', isVisible: true },
            { type: ContactType.PHONE, value: '+123456789', isVisible: true },
            { type: ContactType.TWITTER, value: '@prime_ng', isVisible: true },
            { type: ContactType.EMAIL, value: 'contact@primetek.com.tr', isVisible: true },
            { type: ContactType.FAX, value: '+123456789', isVisible: true }
        ];
        console.log(this.contacts);*/
    }
}
