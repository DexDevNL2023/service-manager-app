import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PageContent} from "../../utilities/models/PageContent";
import {PageService} from "../../utilities/services/page.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    pageContent: PageContent | undefined;
    items = [
        {
            imageUrl: 'assets/layout/images/landing/abouts.webp',
            title: 'Unlimited Inbox',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            imageUrl: 'assets/layout/images/landing/contacts.webp',
            title: 'Data Security',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            imageUrl: 'assets/layout/images/landing/offers.webp',
            title: 'Cloud Backup Williams',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
    ];

    constructor(private router: Router, private pageService: PageService) {
        this.initDefaultData();

        // Abonnez-vous aux observables du service pour mettre à jour les données
        this.pageService.pageContent$.subscribe(pageContent => {
            this.pageContent = pageContent;
        });
    }

    // Définissez une fonction pour naviguer vers le composant de connexion
    navigateToLogin(): void {
        // Utilisez le service pour mettre à jour les données
        this.pageService.updatePage(this.pageContent, null, null);

        this.router.navigate(['/login']);
    }

    initDefaultData(): void {
        this.pageContent = {
            name: 'Nom de votre site',
            description: 'Description de votre site',
            hexaCouleurTheme: '#293782f3',
            getStartedImageUrl: 'assets/layout/images/landing/personal-settings-concept-illustration_114360-2659.avif',
            contactBgImageUrl: 'assets/layout/images/landing/img-contact-bg.svg',
            bannerLeftImageUrl: 'assets/layout/images/landing/bg-12.svg',
            bannerRightImageUrl: 'assets/layout/images/landing/banner24.gif',
            bannerTitle: 'Service Manager, The first services and jobs referencing site.',
            bannerDescription: 'Découvrez ce que nous avons à offrir, Premier segment, Deuxième segment, Troisième segment',
            logoUrl: 'assets/layout/images/logo-white.png',
            faviconUrl: 'assets/layout/images/favicon-white.ico',
            footerTitle: 'Titre du pied de page de votre site',
            footerDescription: 'Description du pied de page de votre site',
        };
        console.log(this.pageContent);
    }
}
