import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PageContent} from "../../utilities/models/PageContent";
import {PageService} from "../../utilities/services/page.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    pageContent: PageContent | undefined;

    constructor(private router: Router, private pageService: PageService) {
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
}
