import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [
        ButtonModule,
        DividerModule
    ]
})
export class RegisterComponent {

    constructor(private router: Router) {}

    // Définissez une fonction pour naviguer vers le composant de connexion
    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }
}
