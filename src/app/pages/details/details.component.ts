import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailsApiService} from "../../utilities/services/details.api.service";
import {SectionType} from "../../utilities/enums/SectionType";
import {CareerContent} from "../../utilities/models/CareerContent";
import {OfferContent} from "../../utilities/models/OfferContent";
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

    career: CareerContent | undefined;
    offer: OfferContent | undefined;

    type: SectionType | undefined = SectionType.OFFER;
    sectionId: number | undefined;
    responsiveOptions: any[] | undefined;
    currentDate = new Date();
    isBannerVisible = true;
    dropdownVisible = false;
    selectedSection: SectionContent;

    constructor(private location: Location, private route: ActivatedRoute, private router: Router, private detailsApiService: DetailsApiService, private generalUtilsService: GeneralUtilsService, private pageService: PageService) { }

    ngOnInit(): void {
        AOS.init();
        this.initDefaultData();

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
            console.log(this.sectionId);
            const typeString = params.get('type');
            console.log(typeString);

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

    toggleDropdown(section: SectionContent): void {
        this.selectedSection = section;
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

    formatDescription(description: string): string {
        return description.replace(/\n/g, '<br>');
    }

    hexToRgb(hex: string): string {
        // Supprimer le # du début s'il est présent
        hex = hex.replace(/^#/, '');

        // Convertir chaque paire de caractères en un nombre décimal
        const bigint = parseInt(hex, 16);

        // Extraire les composants R, V, B
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `${r}, ${g}, ${b}`;
    }

    initDefaultData(): void {
        this.pageContent = {
            name: 'Nom de votre site',
            description: 'Description de votre site',
            hexaCouleurTheme: '#002430',
            getStartedImageUrl: 'assets/layout/images/landing/personal-settings-concept-illustration_114360-2659.avif',
            contactBgImageUrl: 'assets/layout/images/landing/img-contact-bg.svg',
            bannerLeftImageUrl: 'assets/layout/images/landing/bg-10.svg',
            bannerRightImageUrl: 'assets/layout/images/landing/banner24.gif',
            bannerTitle: 'Service Manager, The first services and jobs referencing site.',
            bannerDescription: 'Découvrez ce que nous avons à offrir, Premier segment, Deuxième segment, Troisième segment',
            logoUrl: 'assets/layout/images/logo-white.png',
            faviconUrl: 'assets/layout/images/favicon-white.ico',
            footerTitle: 'Titre du pied de page de votre site',
            footerDescription: 'Description du pied de page de votre site',
        };
        console.log(this.pageContent);
        this.sections = [
            { key: 'homes', label: 'Home', description: 'The people supporting some of the most complex government and commercial projects across the country. We ensure today is safe and tomorrow is smarter. Offering the technology transformations, strategy and mission services needed to get the job done. Enough about us. Let’s get to work.', icon: 'pi pi-home', submenu:[], type: SectionType.HOME, isVisible: true },
            { key: 'abouts', label: 'About Us', description: 'We are client focused and result-oriented. We thrive for quality and ensure the best possible results. From small sized technology solution to delivering big projects. We is equipped with the skills and experiences that streamline the process of delivery and outcome.', icon: 'pi pi-info', submenu:[
                    { label: 'Who We Are', description: 'Consulting is passionate to find the right technology solution for your projects or product development. Understanding the importance of approaching a project with the right resources and tools can bring success for the most complicated project.', isVisible: true },
                    { label: 'Why Nom de votre site?', description: 'Our deep skills and expertise transcend the conventional and complex IT projects, and everything in between. We quickly mobilize and assimilate to fit your project needs. And we take the worry out of things like top security clearances, critical certifications, training, audit and contract alignment so you can focus your valuable time elsewhere.', isVisible: true }
                ], type: SectionType.ABOUT, isVisible: true },
            { key: 'careers', label: 'Careers', description: 'The people supporting and securing some of the most complex government, defense, and intelligence projects across the country. We ensure today is safe and tomorrow is smarter. Our work has meaning and impact on the world around us, but also on us, and that’s important. You make it your own by embracing autonomy, seizing opportunity, and being trusted to deliver your best every day.', icon: 'pi pi-briefcase', submenu:[], type: SectionType.CAREER, isVisible: true },
            { key: 'offers', label: 'What We Do', description: 'Our team of experts has done this many times before. Trust that every learning from our forerunning history of early AWS and Azure cloud adoption in the US Government has prepared us well to select your next technology, or implement what you\'ve chosen to ensure best-in-class cybersecurity capabilities.', icon: 'pi pi-gift', submenu:[
                    { label: 'Cloud Transformation', description: 'Porta lorem mollis aliquam ut porttitor leo a diam.', isVisible: true },
                    { label: 'Cyber Security', description: 'We secure today, embedding resilient cyber solutions into every aspect of the mission.', isVisible: true },
                    { label: 'Networking Engineering', description: 'We understand the importance of networking and can help you establish a reliable and secure network.', isVisible: true },
                    { label: 'Training', description: 'Our career training turn ambitions into job-ready skills.', isVisible: true },
                    { label: 'Web Development', description: 'Web development services help create all types of web software and ensure a great experience for web users.', isVisible: true },
                    { label: 'Application Development', description: 'We offer a wide range of personalized services in applications.', isVisible: true },
                    { label: 'Artificial Intelligence', description: 'We offer AI consulting services and solutions that will help you achieve your business goals faster.', isVisible: true },
                    { label: 'Managed Services (NOC & SOC)', description: 'Our experts are well-versed in customer networking and security needs.', isVisible: true }
                ], type: SectionType.OFFER, isVisible: true
            },
            { key: 'partners', label: 'Partners', description: 'We pride ourselves on being a trusted partner for top government agencies and prominent commercial customers. While the types of services we deliver to customers vary, two things do not: our relentless commitment to quality and our sole focus on all things cybersecurity.', icon: 'pi pi-users', submenu:[], type: SectionType.PARTNER, isVisible: true },
            { key: 'contacts', label: 'Contacts Us', description: 'Interested in our services? Get in touch today!', icon: 'pi pi-envelope', submenu:[], type: SectionType.CONTACT, isVisible: true },
        ];
        console.log(this.sections);
        this.career = { id: 1, job: 'DevOps Engineer', type: CareerType.CDI, description: 'This position, reporting to the Chief Technology Officer (CTO), will work with our CTO and development team leaders on DevOps projects and practices.', missions: 'Design, implement and test CloudSpace’s software build, deployment, and configuration management.\n' +
                'Build and test automation tools for infrastructure provisioning.\n' +
                'Handle code deployments in all environments.\n' +
                'Monitor metrics and develop ways to improve.\n' +
                'Build, maintain, and monitor configuration standards.\n' +
                'Maintain day-to-day management and administration of projects.\n' +
                'Build and maintain application monitoring and logging infrastructure.\n' +
                'Improve infrastructure development and application development.\n' +
                'Manage CI and CD tools with the team.\n' +
                'Document, design and update various development processes and practices.', jobRequirements: '', applicantProfile: '4-year technical degree or equivalent experience\n' +
                '2 years of prior experience as DevOps engineer\n' +
                'Hands-on experience with configuration management and application deployment tools like Ansible\n' +
                'Familiarity with Docker, Kubernetes, Prometheus, Grafana, and AWS\n' +
                'Strong communication skills and attention to detail', applicationDocuments: '', appyInstructions: '', dateLimite: '25/03/2024', heureLimite: '10:30', partenaire: { name: 'Carahsoft', siteWeb: 'https://www.carahsoft.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d603377b1252285556ec01_Carahsoft.svg' }, isVisible: true };
        console.log(this.career);
        this.offer = { id: 6, name: 'Application Development', price: '15$', period: 'Application', description: 'We offer a wide range of personalized services in applications.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'Carahsoft', siteWeb: 'https://www.carahsoft.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d603377b1252285556ec01_Carahsoft.svg' }, subscriptionMessage: 'Buy Now', isVisible: true };
        console.log(this.offer);
        this.contacts = [
            { type: ContactType.WHATSAPP, value: '+123456789', isVisible: true },
            { type: ContactType.FACEBOOK, value: '@prime_ng', isVisible: true },
            { type: ContactType.PHONE, value: '+123456789', isVisible: true },
            { type: ContactType.TWITTER, value: '@prime_ng', isVisible: true },
            { type: ContactType.EMAIL, value: 'contact@primetek.com.tr', isVisible: true },
            { type: ContactType.FAX, value: 'KGD-456-789', isVisible: true }
        ];
        console.log(this.contacts);
    }
}
