import {Component, OnInit} from '@angular/core';
import { MenuService } from './app.menu.service';
import { AppComponent } from './app.component';
import {SharedService} from "./utilities/services/shared.service";

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {

    isLandingPageActive: boolean = false;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    slimMenuActive: boolean;

    slimMenuAnchor = false;

    toggleMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    configActive: boolean;

    configClick: boolean;

    constructor(private menuService: MenuService, public app: AppComponent, private sharedService: SharedService) {
        this.sharedService.isLandingPageActive$.subscribe((isActive) => {
            this.isLandingPageActive = isActive;
        });
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            if (this.slimMenuActive) {
                this.hideSlimMenu();
            }

            if (this.toggleMenuActive) {
                this.hideToggleMenu();
            }

            this.menuHoverActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        if (this.isToggle()) {
            this.toggleMenuActive = !this.toggleMenuActive;
        }
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onAnchorClick(event) {
        if (this.isSlim()) {
            this.slimMenuAnchor = !this.slimMenuAnchor;
        }
        event.preventDefault();
    }

    onMenuMouseEnter(event) {
        if (this.isSlim()) {
            this.slimMenuActive = true;
        }
    }

    onMenuMouseLeave(event) {
        if (this.isSlim()) {
            this.slimMenuActive = false;
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isHorizontal() {
        return this.app.menuMode === 'horizontal';
    }

    isSlim() {
        return this.app.menuMode === 'slim';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isToggle() {
        return this.app.menuMode === 'toggle';
    }

    isStatic() {
        return this.app.menuMode === 'static';
    }

    isMobile() {
        return window.innerWidth < 1281;
    }

    isDesktop() {
        return window.innerWidth > 1280;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1280 && width > 640;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    hideSlimMenu() {
        this.slimMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    hideToggleMenu() {
        this.toggleMenuActive = false;
        this.staticMenuMobileActive = false;
    }
}
