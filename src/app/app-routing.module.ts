import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppNotfoundComponent} from './utilities/pages/app.notfound.component';
import {AppErrorComponent} from './utilities/pages/app.error.component';
import {AppAccessdeniedComponent} from './utilities/pages/app.accessdenied.component';
import {AppLoginComponent} from './utilities/pages/app.login.component';
import {AppHelpComponent} from './utilities/pages/app.help.component';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsComponent} from "./pages/details/details.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'home/:scrollTo?', component: HomeComponent},
            {path: 'details/:id/:type', component: DetailsComponent},
            {path: 'help', component: AppHelpComponent},
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
