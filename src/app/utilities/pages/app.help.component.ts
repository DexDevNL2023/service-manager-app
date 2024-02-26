import { Component } from '@angular/core';
import {AccordionModule} from "primeng/accordion";

@Component({
    templateUrl: './app.help.component.html',
    imports: [
        AccordionModule
    ],
    standalone: true
})
export class AppHelpComponent {
    text: any;

    filteredText: any[];

    filterText(event) {
        const query = event.query;
        this.filteredText = [];

        for (let i = 0; i < 10; i++) {
            this.filteredText.push(query + i);
        }
    }
}
