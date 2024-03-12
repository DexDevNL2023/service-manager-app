import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PageContent} from "../../utilities/models/PageContent";
import {PageService} from "../../utilities/services/page.service";
import {SectionType} from "../../utilities/enums/SectionType";
import {CareerType} from "../../utilities/enums/CareerType";
import {PartnerType} from "../../utilities/enums/PartnerType";
import {ContactType} from "../../utilities/enums/ContactType";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    pageContent: PageContent | undefined;

    constructor(private router: Router, private pageService: PageService) {
        this.initDefaultData();

        // Abonnez-vous aux observables du service pour mettre à jour les données
        this.pageService.pageContent$.subscribe(pageContent => {
            this.pageContent = pageContent;
        });
    }

    // Définissez une fonction pour naviguer vers le composant d'inscription
    navigateToRegister(): void {
        // Utilisez le service pour mettre à jour les données
        this.pageService.updatePage(this.pageContent, null, null);

        this.router.navigate(['/register']);
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
