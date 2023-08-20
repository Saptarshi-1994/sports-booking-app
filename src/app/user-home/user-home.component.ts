import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../common/constants';

import { CacheService } from '../common/services/cache-service';
import { RouteUtilService } from '../common/services/route-util.service';
import { BaseComponent } from '../common/components/base/base.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent extends BaseComponent implements OnInit {

  sports = [
    {
      sportName: 'Cricket',
      sportImgSrc: '../../assets/images/cricket/cricket-img-4.jpg'
    },
    {
      sportName: 'Football',
      sportImgSrc: '../../assets/images/football/football-img-2.jpg'
    },
    {
      sportName: 'Other',
      sportImgSrc: '../../assets/images/cricket/cricket-img-2.jpg'
    }
  ];

  constructor(
    public override router: Router, 
    public override cacheService: CacheService,
    private routeUtilService: RouteUtilService) {
      super(router, cacheService, null);
  }

  ngOnInit(): void {
    this.validateUser();
  }

  selectSport(sportName: string) {
    this.cacheService.setSelectedSport(sportName);
    this.router.navigate(['/user-selection']);
  }

  goToPrevPage() {
    this.cacheService.clearCacheLogOut();
    this.router.navigate(['/home']);
  }

}
