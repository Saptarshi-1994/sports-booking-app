import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as models from '../../model/models/models';

import { CacheService } from '../common/services/cache-service';
import { RouteUtilService } from '../common/services/route-util.service';

import { BaseComponent } from '../common/components/base/base.component';

import { SportsMaps } from '../common/maps/sports-maps';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  
  @ViewChild('updateProfileForm') updateProfileForm!: NgForm;

  roles: Array<any> = new Array();
  showDropDown: Array<boolean> = new Array<boolean>();
  selectedRoles: Array<string[]> = new Array();

  constructor(
    public override router: Router, 
    public override cacheService: CacheService,
    private routeUtilService: RouteUtilService,
    public override sportsMap: SportsMaps) {
      super(router, cacheService, sportsMap);
  }

  ngOnInit(): void {
    this.validateUser();
    this.curateUserSportsDetails();
  }

  curateUserSportsDetails() {
    if (this.userDetails?.sportsDetails && this.userDetails?.sportsDetails.length > 0) {
      this.userDetails.sportsDetails.forEach((eachDetail, index) => {

        this.showDropDown.push(false);
        const sportsMap = this.sportsMap.sportMappings.find(
          (eachMap) => eachMap.sport.toUpperCase() === eachDetail.sport.toUpperCase());
        this.roles.push(sportsMap?.roles);

        if (eachDetail.roles && eachDetail.roles.length > 0) {
          const tempStrArr = new Array<string>();
          eachDetail.roles.forEach((eachRole) => {
            const roleIndex = this.roles[index].findIndex((eachMap: any) => eachMap.id === eachRole);
            if (this.isValidIndex(roleIndex)) { 
              tempStrArr.push(this.roles[index][roleIndex].value); 
              this.roles[index][roleIndex].checked = true;
            }

          })
          this.selectedRoles.push(tempStrArr);
        }

      });
    }
  }


  /* ================ SPORTS FORM METHODS ====================== */

  isSportSelectedBefore(id: string): boolean {
    const index = this.userDetails?.sportsDetails.findIndex((eachDetail) => eachDetail.sport === id);
    return this.isValidIndex(index) ? true : false;
  }


  changeSport(sportIndex: number) {
    const rolesArr = this.sportsMap.sportMappings.find((eachMap) => {
      return eachMap.sport && eachMap.sport === this.userDetails?.sportsDetails[sportIndex].sport
    });

    if (rolesArr) { this.roles.push(rolesArr.roles); }
  }


  getSelectedValue(status: Boolean, id: string, index: number) {

    const role = this.roles[index].find((eachRole: any) => eachRole.id === id);
    if (!role) { return; }

    if (status) {
      this.userDetails?.sportsDetails[index].roles.push(role.id);
      this.selectedRoles[index]?.push(role.value);
      return;
    }

    const indexInRole = this.userDetails?.sportsDetails[index].roles.indexOf(id);
    const indexInSelectedRole = this.selectedRoles[index]?.indexOf(role.value);

    indexInRole && this.isValidIndex(indexInRole) && this.userDetails?.sportsDetails[index].roles.splice(indexInRole, 1);
    this.isValidIndex(indexInSelectedRole) && this.selectedRoles[index]?.splice(indexInSelectedRole, 1);
  }


  addNewSport() {
    const newSportDetail = new models.SportsDetails();
    this.userDetails?.sportsDetails.push(newSportDetail);
    this.showDropDown.push(false);
  }

  removeSport(index: number) {
    this.userDetails?.sportsDetails.splice(index, 1);
    this.showDropDown.pop();
  }


  /* ======================  FORM VALIDATION ============================= */
  goToPrevPage() {
    const prevRoute = this.routeUtilService.getPreviousUrl();
    this.router.navigate([prevRoute]);
  }

  updateProfile() {

    this.updateProfileForm.onSubmit({} as any);
    const isValidForm = this.checkForFormValidity(this.updateProfileForm);

    if (!isValidForm) {
      alert('Error!!');
      return;
    }
    this.updateNewUser();
    console.log('Updated Profile:  ', this.userDetails);
    this.router.navigate(['/user-home']);
  }

  updateNewUser() {
    this.userDetails?.sportsDetails.forEach((eachSportDetail) => {
      const team = eachSportDetail.teams[0];
      if (team.indexOf(',') > 0) {
        const teamNames = team.split(',');
        eachSportDetail.teams = new Array<string>();
        eachSportDetail.teams = [...teamNames];
      }
    });
  }
}
