import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {SharedService} from "../../utilities/services/shared.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
import {RippleModule} from "primeng/ripple";
import {SectionSubMenuContent} from "../../utilities/models/SectionSubMenuContent";
import {HomeContent} from "../../utilities/models/HomeContent";
import {TagModule} from "primeng/tag";
import {CareerType} from "../../utilities/enums/CareerType";
import {ImageModule} from "primeng/image";
import {PartnerType} from "../../utilities/enums/PartnerType";
import {ContactType} from "../../utilities/enums/ContactType";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

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
        ScrollTopModule,
        RippleModule,
        TagModule,
        ImageModule,
        FormsModule
    ],
    templateUrl: './landing2.html'
})
export class HomeComponent implements OnInit {
    homePageContent: HomePageContent | undefined;
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
    homes: HomeContent[] = [
        { title: 'Home', icon: 'pi pi-home', description: 'The first services and jobs referencing site.', isVisible: true },
        { title: 'About', icon: 'pi pi-info', description: 'We provide you with the best advisors for your success.', isVisible: true },
        { title: 'Careers', icon: 'pi pi-briefcase', description: 'Find job offers tailored to your professional goals.', isVisible: true },
        { title: 'Offers', icon: 'pi pi-gift', description: 'Highlight your services using the most popular digital platform.', isVisible: true},
        { title: 'Partners', icon: 'pi pi-users', description: 'Become partners and benefit.', isVisible: true },
        { title: 'Contacts', icon: 'pi pi-envelope', description: 'We are at your service 24h/24 and 7j/7.', isVisible: true },
    ];
    abouts: AboutContent[] = [
        { title: 'Ordered', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
        { title: 'Processing', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-cog', color: '#673AB7', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
        { title: 'Shipped', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-shopping-cart', color: '#FF9800', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
        { title: 'Delivered', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', icon: 'pi pi-check', color: '#607D8B', image: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg', isVisible: true },
    ];
    careers: CareerContent[] = [
        { id: 1, job: 'Ordered', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 2, job: 'Processing', type: CareerType.CDD, description: 'Lorem ipr error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 3, job: 'Shipped', type: CareerType.STAGE, description: '', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 4, job: 'Delivered', type: CareerType.CDD, description: 'Lorem ipsuror repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 5, job: 'Ordered', type: CareerType.CDD, description: '', missions: '', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 6, job: 'Processing', type: CareerType.CDI, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 7, job: 'Shipped', type: CareerType.CDI, description: '', missions: '', jobRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', applicantProfile: '', applicationDocuments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', appyInstructions: '', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
        { id: 8, job: 'Delivered', type: CareerType.STAGE, description: '', missions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', jobRequirements: '', applicantProfile: '', applicationDocuments: '', appyInstructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateLimite: '05/10/2024', heureLimite: '10:30', partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, isVisible: true },
    ];
    offers: OfferContent[] = [
        { id: 1, name: 'Build your web site', price: '10$', period: '10$', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
        { id: 2, name: 'DevOPS', price: '10$', period: '20$', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Try Free', isVisible: true },
        { id: 3, name: 'Build your mobile app', price: '10$', period: '30$', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
        { id: 4, name: 'Basic', price: '10$', period: '10$', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: '', isVisible: true },
        { id: 5, name: 'Premium', price: '10$', period: '20$', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Try Free', isVisible: true },
        { id: 6, name: 'Enterprise', price: '10$', period: '30$', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
        { id: 7, name: 'Basic', price: '10$', period: '10$', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: '', isVisible: true },
        { id: 8, name: 'Premium', price: '10$', period: '20$', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Buy Now', isVisible: true },
        { id: 9, name: 'Enterprise', price: '10$', period: '30$', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'IT Graphik', contact: 'Porta lorem.', siteWeb: 'Porta lorem.', logo: 'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg' }, subscriptionMessage: 'Contact Us', isVisible: true },
    ];
    partners: PartnerContent[] = [
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
    contacts: ContactContent[] = [
        { type: ContactType.WHATSAPP, value: '+123456789', isVisible: true },
        { type: ContactType.FACEBOOK, value: '@prime_ng', isVisible: true },
        { type: ContactType.PHONE, value: '+123456789', isVisible: true },
        { type: ContactType.TWITTER, value: '@prime_ng', isVisible: true },
        { type: ContactType.EMAIL, value: 'contact@primetek.com.tr', isVisible: true },
        { type: ContactType.FAX, value: '+123456789', isVisible: true }
    ];
    responsiveOptions: any[] | undefined;
    loading: boolean = true;
    currentDate = new Date();
    defaultSections: any[] | undefined;
    isBannerVisible = true;
    // Assurez-vous que homePageContent.bannerTitle est défini avant d'utiliser ce code
    bannerTitles: string[] = ["Service Manager", "App"];
    defaultColor: string = '#293782f3';
    dropdownVisible = false;
    maxLength: number = 100;
    // Initialize properties to hold input values
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    messageText: string = '';

    constructor(private messageService: MessageService, private el: ElementRef, private sharedService: SharedService, private homeApiService: HomeApiService, private route: ActivatedRoute, private router: Router, private generalUtilsService: GeneralUtilsService) {}

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

        // Récupérer le paramètre 'scrollTo' de l'URL
        this.route.params.subscribe(params => {
            const scrollTo = params['scrollTo'];

            // Assurez-vous que scrollToSection est défini avant de faire défiler
            if (scrollTo) {
                // Faire défiler la page vers la section correspondante
                this.scrollTo(scrollTo);
            }
        });

        // Récupérez du contenu dynamique depuis le backend
        this.homeApiService.getSections().subscribe((data: HomePageContent) => {
            this.homePageContent = data;
            this.sections = data.sections;

            // Ajoutez les titres dynamiques à partir de homePageContent.bannerTitle
            if (this.homePageContent && this.homePageContent.bannerTitle) {
                this.bannerTitles.push(...this.homePageContent.bannerTitle.split(','));
            }

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

    toggleDropdown(): void {
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

        // Naviguez vers DetailsComponent avec les paramètres de l'URL
        this.sharedService.setHomePageContent(this.homePageContent);
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

    private generateAboutCardContent(abouts: AboutContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generalUtilsService.generateLabelContent(label);
        const defaultText = this.generalUtilsService.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const timeLineItems = abouts.map(about => `
            <ng-container [ngIf]="${about}">
                <ng-template pTemplate="marker" let-event>
                    <span class="custom-marker shadow-2" [style.backgroundColor]="${this.homePageContent?.hexaCouleurTheme || this.defaultColor}">
                        <i [ngIf]="${about.icon}" [ngClass]="${about.icon}"></i>
                    </span>
                </ng-template>
                <ng-template pTemplate="content" let-event>
                    <p-card [header]="${about.title.toUpperCase()}" [subheader]="${about.subTitle}" [style]="{ width: '640px' }" [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">
                        <p-galleria [ngIf]="${about.images}" [(value)]="${about.images}" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                            <ng-template let-image pTemplate="item">
                                <img [src]="image" [alt]="${about.title}" width="200" class="shadow-2" [preview]="true" />
                            </ng-template>
                        </p-galleria>
                        <p style="line-height: 1.5">${about.description}</p>
                       <p-button label="View More" icon="pi pi-chevron-right"
                            [style.background-color]="${this.homePageContent?.hexaCouleurTheme || this.defaultColor}"
                            style="color: white;"
                            (click)="viewDetails(${about.id}, ${type})"></p-button>
                    </p-card>
                </ng-template>
            </ng-container>
        `);
        return `
            <ng-container [ngIf]="${abouts} && ${abouts.length} > 0">
                ${labelHtml}
                <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
                <p-timeline [ngIf]="${abouts}" [value]="${abouts}" align="alternate" styleClass="customized-timeline">
                  ${timeLineItems.join('\n')}
                </p-timeline>
            </ng-container>
        `;
    }

    private generateCareerCardContent(careers: CareerContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generalUtilsService.generateLabelContent(label);
        const defaultText = this.generalUtilsService.getDefaultText(type);

        const carouselItems = careers.map(career => `
            <ng-container [ngIf]="${career}">
                <ng-template let-partner pTemplate="item">
                  <p-card header="${career.job.toUpperCase()}" subheader="${this.generalUtilsService.getCareerTypeLabel(career.type)}" [style]="{ width: '640px' }" [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">
                    <ng-template pTemplate="header">
                      <img [ngIf]="${career.partenaire.logo}" [ngSrc]="${career.partenaire.logo}" alt="${career.job}" class="w-6 shadow-2" [preview]="true" />
                    </ng-template>
                    <ng-template pTemplate="content">
                      <p style="line-height: 1.5">${this.generalUtilsService.getCareerTypeLabel(career.type)}</p>
                      <p-tag [value]="Deadline ${career.dateLimite} at ${career.heureLimite}" [severity]="${this.generalUtilsService.getSeverity(career.dateLimite, career.heureLimite)}"></p-tag>
                    </ng-template>
                    <ng-template pTemplate="footer">
                       <p-button label="View More" icon="pi pi-chevron-right"
                            [style.background-color]="${this.homePageContent?.hexaCouleurTheme || this.defaultColor}"
                            style="color: white;"
                            (click)="viewDetails(${career.id}, ${type})"></p-button>
                    </ng-template>
                  </p-card>
                </ng-template>
            </ng-container>
        `);
        return `
            <ng-container [ngIf]="${careers} && ${careers.length} > 0">
                ${labelHtml}
                <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
                <p-carousel [ngIf]="${careers}" [value]="${careers}" [numScroll]="3" [circular]="true" [responsiveOptions]="responsiveOptions">
                  ${carouselItems.join('\n')}
                </p-carousel>
            </ng-container>
        `;
    }

    private generateContactCardContent(contacts: ContactContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generalUtilsService.generateLabelContent(label);
        const defaultText = this.generalUtilsService.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const fieldsetItems = contacts.map(contact => {
            let contactAction = this.generalUtilsService.getActionContact(contact.description, contact.type); // Variable pour stocker l'action associée au contact

            // Vérifiez si contactAction est une chaîne vide
            const showButton = contactAction !== '';

            return `
                <ng-container [ngIf]="${contact}">
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
                        <p-button label="Contact us" style="color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor}" [text]="true" [raised]="true" [plain]="true" (click)="${contactAction}"></p-button>` : ''}
                    </p-fieldset>
                </ng-container>`;
        });
        return `
            <ng-container [ngIf]="${contacts} && ${contacts.length} > 0">
                ${labelHtml}
                <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
                ${fieldsetItems.join('\n')}
            </ng-container>
        `;
    }

    private generateOfferCardContent(offers: OfferContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generalUtilsService.generateLabelContent(label);
        const defaultText = this.generalUtilsService.getDefaultText(type);

        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const carouselItems = offers.map(offer => `
            <ng-container [ngIf]="${offer}">
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
                       <p-button label="View More" icon="pi pi-chevron-right"
                            [style.background-color]="${this.homePageContent?.hexaCouleurTheme || this.defaultColor}"
                            style="color: white;"
                            (click)="viewDetails(${offer.id}, ${type})"></p-button>
                   </ng-template>
                </p-galleria>
            </ng-container>
        `);
        return `
            <ng-container [ngIf]="${offers} && ${offers.length} > 0">
                ${labelHtml}
                <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
                <p-carousel [ngIf]="${offers}" [value]="${offers}" [numVisible]="3" [numScroll]="3" [responsiveOptions]="responsiveOptions">
                  ${carouselItems.join('\n')}
                </p-carousel>
            </ng-container>
        `;
    }

    private generatePartnerCardContent(partners: PartnerContent[], label: string, description: string, type: SectionType): string {
        // Personnalisez cette fonction en fonction de votre structure de données spécifique
        const labelHtml = this.generalUtilsService.generateLabelContent(label);
        const defaultText = this.generalUtilsService.getDefaultText(type);

        const carouselItems = partners.map(partner => `
            <ng-container [ngIf]="${partner}">
                <ng-template let-partner pTemplate="item">
                  <p-card header="${partner.name.toUpperCase()}" subheader="${this.generalUtilsService.getPartnerTypeLabel(partner.type)}" [style]="{ width: '360px' }" [ngStyle]="{ color: ${this.homePageContent?.hexaCouleurTheme || this.defaultColor} }">
                    <ng-template pTemplate="header">
                      <img [ngIf]="${partner.logo}" [ngSrc]="${partner.logo}" alt="${partner.name}" class="w-6 shadow-2" [preview]="true" />
                    </ng-template>
                    <ng-template pTemplate="content">
                      <p-tag [value]="${partner.siteWeb}" severity="secondary"></p-tag>
                      <p-tag [value]="${partner.contact}" severity="secondary"></p-tag>
                    </ng-template>
                    <ng-template pTemplate="footer">
                       <p-button label="View More" icon="pi pi-chevron-right"
                            [style.background-color]="${this.homePageContent?.hexaCouleurTheme || this.defaultColor}"
                            style="color: white;"
                            (click)="viewDetails(${partner.id}, ${type})"></p-button>
                    </ng-template>
                  </p-card>
                </ng-template>
            </ng-container>
        `);
        return `
            <ng-container [ngIf]="${partners} && ${partners.length} > 0">
                ${labelHtml}
                <span class="text-700 text-sm line-height-3">${description || defaultText}</span>
                <p-carousel [ngIf]="${partners}" [value]="${partners}" [numVisible]="3" [numScroll]="3" [circular]="true" [responsiveOptions]="responsiveOptions" autoplayInterval="3000">
                  ${carouselItems.join('\n')}
                </p-carousel>
            </ng-container>
        `;
    }

    protected readonly SectionType = SectionType;
}
