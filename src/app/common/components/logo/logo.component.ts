import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../../constants';

import * as models from '../../../../model/models/models';
import { CacheService } from '../../services/cache-service';
import { Router } from '@angular/router';

import { LogoService } from './logo.service';
import { RouteUtilService } from '../../services/route-util.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent extends BaseComponent implements OnInit {

  @Input() type: string | undefined;
  @Output() backButtonClick: EventEmitter<any> = new EventEmitter<any>();

  logoIconPath: string | undefined;
  logoTitle: string = 'Some Name';

  constructor(
    public override cacheService: CacheService, 
    public override router: Router, 
    private logoService: LogoService,
    private routeUtilService: RouteUtilService) {
      super(router, cacheService, null);
  }

  ngOnInit(): void {

    if (this.type === Constants.USER_SPECIFIC_LOGO_TYPE) {

      this.validateUser();
      if (!this.userDetails) {
        this.cacheService.clearCacheLogOut();
        this.router.navigate(['/home']);
      } else {
        this.logoTitle = 'Hi, ' + this.userDetails.firstName;
      }
    }
    this.logoIconPath = this.logoService.mapLogoWithSport(this.userDetails);
  }

  updateProfile() { 
    const currentUrl = this.routeUtilService.getCurrentUrl();
    if (currentUrl !== '/user-profile') {
      this.router.navigate(['/user-profile']);
    }
  }

  back() {
    this.backButtonClick.emit();
  }

  logout() {
    this.cacheService.clearCacheLogOut();
    this.router.navigate(['/home']);
  }

  goToHome() {
    this.cacheService.clearCache();
    this.router.navigate(['/user-home']);
  }

}
