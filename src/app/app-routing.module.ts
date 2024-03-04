import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppNotfoundComponent} from './utilities/pages/app.notfound.component';
import {AppErrorComponent} from './utilities/pages/app.error.component';
import {AppAccessdeniedComponent} from './utilities/pages/app.accessdenied.component';
import {AppHelpComponent} from './utilities/pages/app.help.component';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsComponent} from "./pages/details/details.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home/:scrollTo?', component: HomeComponent },
            { path: 'details/:id/:type', component: DetailsComponent },
            { path: 'help', component: AppHelpComponent },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: '/home/header', pathMatch: 'full' },
            { path: '**', redirectTo: '/notfound' }
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
