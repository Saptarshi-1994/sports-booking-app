import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../common/constants';

import { CacheService } from '../common/services/cache-service';
import { RouteUtilService } from '../common/services/route-util.service';
import { BaseComponent } from '../common/components/base/base.component';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent extends BaseComponent implements OnInit {

  actions = [ 
    {
      actionName: 'Request a Player',
      imgSrc: ''
    },
    {
      actionName: 'Request a Team',
      imgSrc: ''
    },
    {
      actionName: 'Host a Match',
      imgSrc: ''
    }    
  ];
  selectedSport: string | undefined;

  readonly cricketImagePaths = [
    '../../assets/images/cricket/cricket_ground.jpg',
    '../../assets/images/cricket/cricket-img-2.jpg',
    '../../assets/images/cricket/cricket-img-3.jpg',
    '../../assets/images/cricket/cricket-img-4.jpg',
    '../../assets/images/cricket/cricket-img-5.jpg',
    '../../assets/images/cricket/cricket-img-6.jpg',
    '../../assets/images/cricket/cricket-img-7.jpg',
    '../../assets/images/cricket/cricket-img-8.jpg',
  ];

  readonly footballImagePaths = [
    '../../assets/images/football/football_ground.jpg',
    '../../assets/images/football/football-img-2.jpg',
    '../../assets/images/football/football-img-3.jpg',
    '../../assets/images/football/football-img-4.jpg',
    '../../assets/images/football/football-img-5.jpg',
    '../../assets/images/football/football-img-6.jpg',
    '../../assets/images/football/football-img-7.jpg',
    '../../assets/images/football/football-img-8.jpg',
  ];

  constructor(
    public override router: Router, 
    public override cacheService: CacheService,
    private routeUtilService: RouteUtilService) {
      super(router, cacheService, null);
  }

  ngOnInit(): void {
    this.validateUser();
    this.selectedSport = this.cacheService.getSelectedSport();
    this.actions.forEach((eachAction) => eachAction.imgSrc = this.getRandomSportsImage());
  }

  getRandomSportsImage(): string {

    let imageArr: string | any[] = [];
    if (this.selectedSport?.toUpperCase() === Constants.SPORTS_NAME_CRICKET)
      imageArr = this.cricketImagePaths;
    else if (this.selectedSport?.toUpperCase() === Constants.SPORTS_NAME_FOOTBALL)
      imageArr = this.footballImagePaths;

    const randomIndex = Math.floor(Math.random() * imageArr.length);
    return imageArr[randomIndex];
  }

  selectAction(action: string) {
    this.cacheService.setSelectedUserService(action);
    this.routeToNextPage(action);
  }

  goToPrevPage() {
    this.cacheService.setSelectedUserService(undefined);
    this.cacheService.setSelectedSport(undefined);
    this.router.navigate(['/user-home']);
  }

  routeToNextPage(action: string) {

    switch (action.toUpperCase()) {
      case 'REQUEST A PLAYER':
        this.router.navigate(['/request-player']);
        break;
      case 'REQUEST A TEAM':
        this.router.navigate(['/request-team']);
        break;
      case 'HOST A MATCH':
      default:
        this.router.navigate(['']);
    }
  }


}
