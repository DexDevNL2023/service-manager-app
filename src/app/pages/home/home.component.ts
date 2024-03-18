import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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
import {PartnerType} from "../../utilities/enums/PartnerType";
import {PageService} from "../../utilities/services/page.service";

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

    @ViewChild('bannerSvg') bannerSvg: ElementRef<SVGElement>; // Référence à l'élément SVG

    constructor(private el: ElementRef, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private homeApiService: HomeApiService, private generalUtilsService: GeneralUtilsService, private pageService: PageService) {}

    ngOnInit(): void {
        console.log('run 1');
        this.initDefaultData();

        // Récupérer le paramètre 'scrollTo' de l'URL
        console.log('run 2');
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
        console.log('run 3');
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

        console.log('run 4');
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

    viewDetails(id: number, type: SectionType): void {
        // Utilisez le service pour mettre à jour les données
        this.pageService.updatePage(this.pageContent, this.sections, this.contacts);

        // Convertissez SectionType en chaîne pour l'URL
        const typeString = SectionType[type];

        // Naviguez vers DetailsComponent avec les paramètres de l'URL
        this.router.navigate(['/details', id, typeString]);
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
        console.log('Contact Action:', contact, type);
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

    openPartnerWebsite(websiteUrl: string | undefined): void {
        if (websiteUrl) {
            window.open(websiteUrl, '_blank'); // Ouvre le site Web dans une nouvelle fenêtre/tab
        }
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

    // Méthode pour mettre à jour la couleur du dégradé SVG
    updateGradientColor(): void {
        const bannerSvgElement = this.bannerSvg.nativeElement;
        if (bannerSvgElement) {
            const gradient = bannerSvgElement.querySelector('#paint0_linear');
            if (gradient) {
                const stop1 = gradient.querySelector('stop');
                const stop2 = gradient.querySelector('stop:nth-child(2)');
                if (stop1 && stop2) {
                    stop1.setAttribute('stop-color', this.pageContent.hexaCouleurTheme);
                    // Vous pouvez modifier la couleur de l'autre arrêt en fonction de votre logique
                    // Ici, je vais simplement changer la luminosité de la couleur d'arrêt 2
                    // Mais vous pouvez utiliser une autre logique pour changer la couleur de cet arrêt
                    const couleurDebut = this.pageContent.hexaCouleurTheme;
                    const couleurFin = this.luminositeCouleur(couleurDebut, -0.2); // Réduire la luminosité de 20%
                    stop2.setAttribute('stop-color', couleurFin);
                }
            }
        }
    }

    // Fonction pour ajuster la luminosité de la couleur (fonction auxiliaire)
    luminositeCouleur(couleur: string, luminosite: number): string {
        couleur = couleur.substring(1); // Supprimer le #
        let rgb = parseInt(couleur, 16); // Convertir la couleur hexadécimale en entier

        // Extraire les composantes RGB
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >> 8) & 0xff;
        let b = (rgb >> 0) & 0xff;

        // Appliquer la luminosité
        r += Math.round(luminosite * r);
        g += Math.round(luminosite * g);
        b += Math.round(luminosite * b);

        // Limiter les valeurs RGB à [0, 255]
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        // Retourner la nouvelle couleur sous forme hexadécimale
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    formatDescription(description: string): string {
        return description.replace(/\n/g, '<br>');
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
        this.homes = [
            { title: 'Modern tooling', icon: 'pi pi-shield', description: 'he right tools are critical to daily operations and cybersecurity program success, especially when you’re migrating to the cloud, onboarding new applications, or reconfiguring your network. We guide you through the tooling selection process and can help you configure and implement the right technologies based on your needs.', isVisible: true},
            { title: 'Automation and DevSecOps', icon: 'pi pi-slack', description: 'We don’t design something, hand it off to your teams without any input, and leave. Instead, MPG works side by side with your DevOps and security teams to architect a solution that enables developers to do everything they need, all with code.', isVisible: true },
            { title: 'Planning for the future', icon: 'pi pi-database', description: 'Threat actors are constantly evolving, so we consider your immediate requirements and help identify ways your architecture will evolve to meet new challenges for years to come.', isVisible: true },
        ];
        console.log(this.homes);
        this.abouts = [
            { title: 'Working in the cloud should be an empowering experience, not an obstacle to overcome.', description: 'We translate the language of the cloud into the language of the mission and offer our customers the power of choice through a vast cloud ecosystem.\n' +
                    '\n' +
                    'We delivers clarity. From strategy to security, migration to maintenance, we ensure cloud is a solution, not a complication.', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'assets/layout/images/landing/cloud_transformation.png', isVisible: true },
            { title: 'Cyber impacts every aspect of our lives. That’s why we is driven to ensure clients have cyber protection today, while outthinking the threats of tomorrow.', description: 'We secure today, embedding resilient cyber solutions into every aspect of the mission. And we prepare for tomorrow, deploying new technology and partnerships to anticipate and preempt future risks.\n' +
                    '\n' +
                    'We do all of this because we know cyber is not a singular part of the mission—it’s the thread that runs across every endpoint, every network, and every person. By proactively protecting, instantly responding and constantly evolving, CloudSpace Consulting makes today secure and tomorrow smarter.', icon: 'pi pi-cog', color: '#673AB7', image: 'assets/layout/images/landing/cyber_security.png', isVisible: true },
            { title: 'Our career training turns ambitions into job-ready skills and business goals into tangible results. We follow the teaching method that helps students to understand the concepts and implement it by themselves.', description: 'You can choose technology career track that includes Cloud Computing, Network Engineering and Cybersecurity.\n' +
                    '\n' +
                    'The CloudSpace training aims to make you an expert in your chosen career track and make you capable of implementing your skills in a job. Our training program has been recognized for empowering and teaching underprivileged communities.', icon: 'pi pi-shopping-cart', color: '#FF9800', image: 'assets/layout/images/landing/training.png', isVisible: true },
            { title: 'Organizations depend on a speedy, reliable, and safe network infrastructure. If one element fails or underperforms, it can cause a ripple effect with a detrimental cost to any business.', description: 'Leveraging cutting-edge automation tools and technologies, we bring innovation and efficiency to building networks that solve your most complex problems.\n' +
                    '\n' +
                    'Our certified engineers are adept at eliminating risk and optimizing network performance, allowing for better scalability and sustainability.', icon: 'pi pi-check', color: '#607D8B', image: 'assets/layout/images/landing/network.png', isVisible: true },
            { title: 'What web solution do you need?', description: 'Web development services help create all types of web software and ensure a great experience for web users.\n' +
                    '\n' +
                    'Different types of web solutions may seem similar from the outside, but we approach them differently and know what the winning factors are in each case.', icon: 'pi pi-shopping-cart', color: '#FF98ff', image: 'assets/layout/images/landing/web-development.jpg', isVisible: true },
            { title: 'CloudSpace is a renowned web and mobile application development company', description: 'We is well known for finding innovative and eye-catching mobile apps and websites. We offer a wide range of customized services in the areas of mobile applications, website development, AR-VR development, game development, blockchain development and much more.\n' +
                    '\n' +
                    'Our qualified team and products are designed to bring growth to your business. We believe in providing services without compromising on time and quality.', icon: 'pi pi-check', color: '#007080', image: 'assets/layout/images/landing/application.jpg', isVisible: true },
            { title: 'AI for Business: Reinventing What’s Possible', description: 'AI is becoming a megatrend that is transforming industries, businesses and the way we live and work. Organizations that build a strong foundation in data and AI will be better positioned to reinvent themselves, compete and achieve new levels of performance.\n' +
                    '\n' +
                    'Accenture helps companies move from interest in AI to action to creating value, responsibly with clear business cases. We help businesses prepare their data, people and processes for AI, with a secure, cloud-based digital core that enables continuous reinvention and increased growth, efficiency and resilience.', icon: 'pi pi-shopping-cart', color: '#FFAa80', image: 'assets/layout/images/landing/AI.jpg', isVisible: true },
            { title: 'NOC SOC as a Service', description: 'The Network Operations Center (NOC) and Security Operations Center (SOC) are essential services for identifying and resolving system and security issues, respectively. NOC helps businesses identify, investigate and resolve system issues. On the other hand, SOC allows businesses to identify and respond to security incidents and alerts that may impact crucial data and systems.\n' +
                    '\n' +
                    'Although the roles of the NOC and SOC seem similar, they have different responsibilities. However, both services have excellent benefits for a business.', icon: 'pi pi-check', color: '#a07D8B', image: 'assets/layout/images/landing/manage_services.jpg', isVisible: true }
        ];
        console.log(this.abouts);
        this.careers = [
            { id: 1, job: 'DevOps Engineer', type: CareerType.CDI, description: 'This position, reporting to the Chief Technology Officer (CTO), will work with our CTO and development team leaders on DevOps projects and practices.', missions: 'Design, implement and test CloudSpace’s software build, deployment, and configuration management.\n' +
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
                    'Strong communication skills and attention to detail', applicationDocuments: '', appyInstructions: '', dateLimite: '25/03/2024', heureLimite: '10:30', partenaire: { name: 'Carahsoft', siteWeb: 'https://www.carahsoft.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d603377b1252285556ec01_Carahsoft.svg' }, isVisible: true },
            { id: 2, job: 'Cyber Security Engineer', type: CareerType.CDD, description: 'We is seeking a Cyber Security Engineer (Cyber Defense Infrastructure Support) for our customer site in Washington, DC.', missions: 'The Cyber Security Engineer’s responsibilities include the design, development, integration, implementation, operation and analysis of cyber security technologies. Additionally, this candidate will provide support to ensure products and services comply with all appropriate Information Assurance policies/procedures, network defense requirements and best practices.\n' +
                    '\n' +
                    'Our Cyber Security Engineer will provide support protection activities and response actions for government Information Technology systems and this person will help ensure that all products and services delivered on this contract meet or exceed the security criteria specified by external authorities for computer network defense.', jobRequirements: 'BS/BA and 8+ years of experience in the CND discipline OR a MA/MS and 6 + years of relevant work experience. A candidate without a degree who has 12+ years of relevant experience can also be considered.\n' +
                    '6+ yrs of design, development, integration, implementation, operation and analysis of cyber security technologies.', applicantProfile: 'Active CISSP, GCIA, CEH, CNDA, GCIH or CSIH certification\n' +
                    '\n' +
                    'Previous knowledge of Splunk, auditing and cloud technologies highly desired', applicationDocuments: '', appyInstructions: '', dateLimite: '15/06/2024', heureLimite: '10:30', partenaire: { name: 'Noname Security', siteWeb: 'https://nonamesecurity.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648354cad4dc09048c0166ee_Noname-Partner-Logo.webp' }, isVisible: true },
            { id: 3, job: 'Cloud Network Engineer', type: CareerType.STAGE, description: 'The role of Cloud/Infrastructure Engineer is to help client to maintain the current network and cloud infrastructure. The position will interface with clients, support their systems both on-premises and on cloud. The role requires wide breath of knowledge and willingness to learn through formal and hands-on training. This is a client-facing position and excellent communication skills are essential.', missions: 'Interface with customers, vendors, and other technical staff to analyze business and technical requirements relating to the Network and cloud infrastructure.\n' +
                    'Responsible to configure, test and produce low-level and high-level documentation of the deployment within the stipulated time frame.\n' +
                    'Works closely with the Project Manager to establish and deliver consistent technical direction, collect and analyze performance metrics, establish and enforce service level agreement.\n' +
                    'Document engineering standards and proposals, leads or assists in the development of security architecture/engineering designs, changes, and configuration management.\n' +
                    'Strong interpersonal and customer service skills in addition to the ability to effectively manage and prioritize individual projects and tasks. Possess superior written and oral communication skills. Solid vendor management skills are required.', jobRequirements: '5+ years of enterprise scale Network operations experience; Routers, Switches, and Load Balancers.\n' +
                    '2+ years of hands-on operational experience with Amazon Web Services (AWS). AWS Certification a strong plus.\n' +
                    'Proficient with deployment and management of AWS services – including but not limited to: VPC, Route 53, ELB, EBS, EC2, S3.\n' +
                    'Hands-on AWS experience deploying, configuring, and Managing AWS Network Technologies – Virtual Private Cloud (VPC), Regions, Availability Zones, Subnets, Route Tables, Internet Gateways, Elastic IPs, NAT Gateways, Network ACLs, Security Groups, VPGs, VPNs, Elastic Load Balancers, AWS Certificate Manager, Flow Logs, CloudFormation, and Direct Connect.\n' +
                    'Experience with VoIP system in an enterprise network, including H.323 and/or Session Initiation Protocol (SIP) technology.\n' +
                    'Demonstrated proficiency in network administration in a large datacenter environment – DNS/DHCP, Load Balancing (F5 Networks, AWS ELB), Firewalls (Cisco Systems, Juniper Networks), IDS/IPS, IPSEC VPN.\n' +
                    'In-depth knowledge of and experience implementing dynamic IP routing protocols (BGP, OSPF, EIGRP, MPLS).\n' +
                    'Excellent network latency analysis, performance monitoring and troubleshooting skills.', applicantProfile: 'Bachelor’s degree in computer science or equivalent work experience, with a minimum of 8-10 years of hands-on experience in the implementation and administration of complex, multi-location, multi-vendor, converged voice/data networks in a geographically distributed environment.\n' +
                    'AWS hands-on operational: 2 years (Required).\n' +
                    'Desired Certifications: CCNP, ITIL, AWS Certified Cloud Practitioner, AWS Certified Solutions Architect Associate.', applicationDocuments: '', appyInstructions: '', dateLimite: '05/04/2024', heureLimite: '10:30', partenaire: { name: 'Salesforce', siteWeb: 'https://www.salesforce.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648355755ed033792e2cfea2_SalesForce-Partner-Logo.webp' }, isVisible: true },
            { id: 4, job: 'Cyber Security Engineer', type: CareerType.CDD, description: 'We is seeking a Cyber Security Engineer (Cyber Defense Infrastructure Support) for our customer site in Washington, DC.', missions: 'The Cyber Security Engineer’s responsibilities include the design, development, integration, implementation, operation and analysis of cyber security technologies. Additionally, this candidate will provide support to ensure products and services comply with all appropriate Information Assurance policies/procedures, network defense requirements and best practices.\n' +
                    '\n' +
                    'Our Cyber Security Engineer will provide support protection activities and response actions for government Information Technology systems and help ensure that all products and services delivered on this contract meet or exceed the security criteria specified by external authorities for computer network defense.', jobRequirements: 'BS/BA and 8+ years of experience in the CND discipline OR a MA/MS and 6+ years of relevant work experience. A candidate without a degree who has 12+ years of relevant experience can also be considered.\n' +
                    '6+ years of design, development, integration, implementation, operation, and analysis of cyber security technologies.', applicantProfile: 'Active CISSP, GCIA, CEH, CNDA, GCIH or CSIH certification\n' +
                    '\n' +
                    'Previous knowledge of Splunk, auditing and cloud technologies highly desired', applicationDocuments: '', appyInstructions: '', dateLimite: '05/05/2024', heureLimite: '10:30', partenaire: { name: 'Microsoft', siteWeb: 'https://www.microsoft.com/en-us/msservices', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648351a45313544d3e100bbc_Microsoft-Partner-Logo.webp' }, isVisible: true }
        ];
        console.log(this.careers);
        this.offers = [
            { id: 1, name: 'Cloud Transformation', price: '1$', period: 'month', description: 'We translate the language of the cloud into the language of the mission.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'Noname Security', siteWeb: 'https://nonamesecurity.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648354cad4dc09048c0166ee_Noname-Partner-Logo.webp' }, subscriptionMessage: 'Buy Now', isVisible: true },
            { id: 2, name: 'Cyber Security', price: '10$', period: 'Year', description: 'We secure today, embedding resilient cyber solutions into every aspect of the mission.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'Salesforce', siteWeb: 'https://www.salesforce.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648355755ed033792e2cfea2_SalesForce-Partner-Logo.webp' }, subscriptionMessage: 'Try Free', isVisible: true },
            { id: 3, name: 'Networking Engineering', price: '30$', period: 'Day', description: 'We understand the importance of networking and can help you establish a reliable and secure network.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'Microsoft', siteWeb: 'https://www.microsoft.com/en-us/msservices', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648351a45313544d3e100bbc_Microsoft-Partner-Logo.webp' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 4, name: 'Training', price: '2$', period: 'month', description: 'Our career training turn ambitions into job-ready skills.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'Proofpoint', siteWeb: 'https://www.proofpoint.com/us', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/6483554828dd1491f0cdd33d_Proofpoint-Partner-Logo.webp' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 5, name: 'Web Development', price: '20$', period: 'Web site', description: 'Web development services help create all types of web software and ensure a great experience for web users.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed'], partenaire: { name: 'Elastic', siteWeb: 'https://www.elastic.co/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648390572f5422ffbf8b0181_Elastic-Partner-Logo.webp' }, subscriptionMessage: 'Try Free', isVisible: true },
            { id: 6, name: 'Application Development', price: '15$', period: 'Application', description: 'We offer a wide range of personalized services in applications.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'Carahsoft', siteWeb: 'https://www.carahsoft.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d603377b1252285556ec01_Carahsoft.svg' }, subscriptionMessage: 'Buy Now', isVisible: true },
            { id: 7, name: 'Artificial Intelligence', price: '60$', period: 'month', description: 'We offer AI consulting services and solutions that will help you achieve your business goals faster.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare'], partenaire: { name: 'UiPath', siteWeb: 'https://www.uipath.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/64835643fc56111f5b605a60_UiPath-Partner-Logo.webp' }, subscriptionMessage: 'Contact Us', isVisible: true },
            { id: 8, name: 'Managed Services (NOC & SOC)', price: '30$', period: 'Year', description: 'Our experts are well-versed in customer networking and security needs.', features: ['Arcu vitae elementum', 'Dui faucibus in ornare', 'Morbi tincidunt augue', 'Duis ultricies lacus sed', 'Imperdiet proin'], partenaire: { name: 'Amazon Web Services', siteWeb: 'https://aws.amazon.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d6020b4de255357457884b_Amazon_Web_Services_Logo.svg' }, subscriptionMessage: 'Contact Us', isVisible: true },
        ];
        console.log(this.offers);
        this.partners = [
            { id: 1, name: 'Microsoft', siteWeb: 'https://www.microsoft.com/en-us/msservices', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648351a45313544d3e100bbc_Microsoft-Partner-Logo.webp', isVisible: true },
            { id: 2, name: 'Noname Security', siteWeb: 'https://nonamesecurity.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648354cad4dc09048c0166ee_Noname-Partner-Logo.webp', isVisible: true },
            { id: 3, name: 'Proofpoint', siteWeb: 'https://www.proofpoint.com/us', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/6483554828dd1491f0cdd33d_Proofpoint-Partner-Logo.webp', isVisible: true },
            { id: 4, name: 'UiPath', siteWeb: 'https://www.uipath.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/64835643fc56111f5b605a60_UiPath-Partner-Logo.webp', isVisible: true },
            { id: 5, name: 'Salesforce', siteWeb: 'https://www.salesforce.com/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648355755ed033792e2cfea2_SalesForce-Partner-Logo.webp', isVisible: true },
            { id: 6, name: 'Elastic', siteWeb: 'https://www.elastic.co/', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/648390572f5422ffbf8b0181_Elastic-Partner-Logo.webp', isVisible: true },
            { id: 7, name: 'Carahsoft', siteWeb: 'https://www.carahsoft.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d603377b1252285556ec01_Carahsoft.svg', isVisible: true },
            { id: 8, name: 'Amazon Web Services', siteWeb: 'https://aws.amazon.com', logo: 'https://assets-global.website-files.com/601959b8cde20c101809c86a/60d6020b4de255357457884b_Amazon_Web_Services_Logo.svg', isVisible: true }
        ];
        console.log(this.partners);
        this.contacts = [
            { type: ContactType.WHATSAPP, value: '+123456789', isVisible: true },
            { type: ContactType.FACEBOOK, value: '@prime_ng', isVisible: true },
            { type: ContactType.PHONE, value: '+123456789', isVisible: true },
            { type: ContactType.TWITTER, value: '@prime_ng', isVisible: true },
            { type: ContactType.EMAIL, value: 'contact@primetek.com.tr', isVisible: true },
            { type: ContactType.FAX, value: 'KGD-456-789', isVisible: true }
        ];
        console.log(this.contacts);

        // Appelez la méthode pour mettre à jour la couleur du dégradé SVG
        this.updateGradientColor();
    }
}
