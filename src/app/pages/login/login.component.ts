import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        ButtonModule,
        DividerModule
    ],
    standalone: true
})
export class LoginComponent {

    constructor(private router: Router) {}

    // Définissez une fonction pour naviguer vers le composant d'inscription
    navigateToRegister(): void {
        this.router.navigate(['/register']);
    }
}
