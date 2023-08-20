import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import * as models from '../../model/models/models';

import { Constants } from '../common/constants';

import { CacheService } from '../common/services/cache-service';
import { MockService } from '../common/services/mock.service';
import { RouteUtilService } from '../common/services/route-util.service';
import { BaseComponent } from '../common/components/base/base.component';

@Component({
  selector: 'app-request-player',
  templateUrl: './request-player.component.html',
  styleUrls: ['./request-player.component.scss']
})
export class RequestPlayerComponent extends BaseComponent implements OnInit {

  selectedSport!: string;
  players!: Array<models.UserDetails>;
  visiblePlayerList!: Array<models.UserDetails>;
  filterInput!: string;
  openMenu!: Array<boolean>;
  pageIndex = {
    startIndex: 0,
    endIndex: 9
  }

  constructor(
    public override router: Router,
    public override cacheService: CacheService,
    private userService: MockService,
    private routeUtilService: RouteUtilService) {
      super(router, cacheService, null);
  }

  ngOnInit(): void {
    this.validateUser();
    this.selectedSport = this.cacheService.getSelectedSport();

    this.userService.getPlayers().subscribe((data: any) => {
      this.players = data.players;
      this.updatePlayersList();
    });

  }

  /* display methods */
  showSportRoles(sportsDetails: Array<models.SportsDetails>): string {
    const selectedSportDetails = sportsDetails.find((eachSport) =>
      eachSport.sport.toUpperCase() === this.selectedSport?.toUpperCase());
    if (!selectedSportDetails)
      return '';

    let roles = '';
    selectedSportDetails.roles.forEach((eachRole, index) => {
      if (index === selectedSportDetails.roles.length - 1) {
        roles = roles + eachRole;
      } else {
        roles = roles + eachRole + ', ';
      }
    });
    return roles;
  }

  showSportRatings(sportsDetails: Array<models.SportsDetails>): number {
    const selectedSportDetails = sportsDetails.find((eachSport) =>
      eachSport.sport.toUpperCase() === this.selectedSport?.toUpperCase());
    return selectedSportDetails ? selectedSportDetails.rating : 0;
  }


  /* route methods */
  goToPrevPage() {
    this.cacheService.setSelectedUserService(undefined);
    this.router.navigate(['/user-selection']);
  }


  /* pagination methods */
  updatePageIndices(event: any) {
    this.pageIndex.startIndex = event.startIndex;
    this.pageIndex.endIndex = event.endIndex;
    this.updatePlayersList();
  }

  updatePlayersList() {
    this.visiblePlayerList = this.players.slice(this.pageIndex.startIndex, this.pageIndex.endIndex);
    this.openMenu = [];
    this.visiblePlayerList.forEach(() => this.openMenu.push(false));
  }

  filterList() {

    if (!this.filterInput || this.filterInput === undefined) {
      this.updatePlayersList();

    } else {

      let filtererdList = this.players.filter((eachItem) => eachItem.firstName.toUpperCase().indexOf(this.filterInput.toUpperCase()) > -1);

      if (!filtererdList || filtererdList.length === 0)
        filtererdList = this.players.filter((eachItem) => eachItem.lastName.toUpperCase().indexOf(this.filterInput.toUpperCase()) > -1);

      if (!filtererdList || filtererdList.length === 0)
        filtererdList = this.players.filter((eachItem) =>
          eachItem.sportsDetails.find((eachItem) =>
            eachItem.sport.toUpperCase() === this.selectedSport.toUpperCase() &&
            eachItem.roles.map((eachItem) => eachItem.toUpperCase()).indexOf(this.filterInput.toUpperCase()) > -1
          )
        );

      this.visiblePlayerList = filtererdList;
    }
  }


  /* request menu methods */
  openRequestMenu(playerIndex: number) {
    this.openMenu.map((item) => item = false );
    this.openMenu[playerIndex] = !this.openMenu[playerIndex];
  }

  closeRequestMenu(playerIndex: number) {
    this.openMenu[playerIndex] = !this.openMenu[playerIndex];
  }


  
  /* request player methods */
  requestPlayer(playerIndex: number) {
    this.cacheService.setSelectedPlayerToRequest(this.visiblePlayerList[playerIndex]);
    this.router.navigate(['/request-details']);
  }


}
