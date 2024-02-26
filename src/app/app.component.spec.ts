import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppMenuComponent} from './app.menu.component';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {MenuService} from './app.menu.service';
import {AppMainComponent} from './app.main.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule, AccordionModule, PanelModule],
            declarations: [
                AppComponent,
                AppMainComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppFooterComponent,
            ],
            providers: [MenuService]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
