import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    imports: [
        RouterLink
    ],
    standalone: true
})
export class AppLoginComponent {
}
