import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RouteUtilService {

    private previousUrl!: string;
    private currentUrl: string;

    // constructor for this component
    constructor(private router: Router) {

        this.currentUrl = this.router.url;
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }

    public getCurrentUrl() {
        return this.currentUrl;
    }
}