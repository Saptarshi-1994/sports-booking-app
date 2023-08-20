import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import * as models from '../../model/models/models';

import { Constants } from '../common/constants';

import { CacheService } from '../common/services/cache-service';
import { RouteUtilService } from '../common/services/route-util.service';
import { BaseComponent } from '../common/components/base/base.component';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends BaseComponent {

  selectedSport!: string;
  selectedPlayer!: models.UserDetails;
  selectedSportsDetails: models.SportsDetails | undefined;

  constructor(
    public override router: Router,
    public override cacheService: CacheService,
    private routeUtilService: RouteUtilService) {
      super(router, cacheService, null);
  }

  ngOnInit(): void {
    this.validateUser();
    this.selectedSport = this.cacheService.getSelectedSport();
    this.selectedPlayer = this.cacheService.getSelectedPlayerToRequest();
    this.selectedSportsDetails = this.selectedPlayer.sportsDetails.find((eachDetail) => eachDetail.sport.toUpperCase() === this.selectedSport.toUpperCase());
  }


  showRoles(): string {
    let roles = '';
    if (this.selectedSportsDetails) {
      this.selectedSportsDetails?.roles.forEach((eachRole, index) =>{
        if (this.selectedSportsDetails && index < this.selectedSportsDetails.roles.length - 1) {
          roles = roles + eachRole + ', ';
        } else if (this.selectedSportsDetails && index == this.selectedSportsDetails.roles.length - 1) {
          roles = roles + ' and ' + eachRole;
        } else {
          roles = roles + eachRole;
        }
      });
    }
    return roles; 
  }

  /* route methods */
  goToPrevPage() {
    this.cacheService.setSelectedPlayerToRequest(undefined);
    this.router.navigate(['/request-player']);
  }

}
