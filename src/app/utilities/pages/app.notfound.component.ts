import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-notfound',
    templateUrl: './app.notfound.component.html',
    imports: [
        RouterLink
    ],
    standalone: true
})
export class AppNotfoundComponent {
}
