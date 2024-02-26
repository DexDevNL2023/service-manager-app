import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-error',
    templateUrl: './app.error.component.html',
    imports: [
        RouterLink
    ],
    standalone: true
})
export class AppErrorComponent {
}
