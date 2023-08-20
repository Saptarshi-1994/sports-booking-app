import { Component, ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('spinnerElement')
  spinnerElement!: ElementRef

  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => this.navigationInterceptor(e));
  }


  // Shows and hides the loading spinner during RouterEvent changes
  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
    }
    // Set loading state to false in both of the below events to
    if (event instanceof NavigationEnd) {
    }
    if (event instanceof NavigationCancel) {
    }
    if (event instanceof NavigationError) {
    }
  }

}
