import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import * as models from './../../../model/index';
import { CacheService } from '../../common/services/cache-service';
import { SportsMaps } from '../../common/maps/sports-maps';
import { NgForm } from '@angular/forms';
import { Obj } from '@popperjs/core';
import { BaseComponent } from '../../common/components/base/base.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignupComponent extends BaseComponent {

  @Input() requestObj = new models.LoginDetails();

  @Output() requestObjEmitter = new EventEmitter<any>();

  @ViewChild('signUpForm') signUpForm!: NgForm;

  roles!: Array<any>;
  showDropDown = false;
  selectedRoles!: Array<string>;

  constructor(
    public override router: Router,
    public override cacheService: CacheService,
    public override sportsMap: SportsMaps) {

    super(router, cacheService, sportsMap);

  }

  ngOnInit(): void {
    if (!this.requestObj.newUserDetails?.sportsDetails || this.requestObj.newUserDetails.sportsDetails.length === 0) {
      const tempObj = new models.SportsDetails();
      this.requestObj.newUserDetails?.sportsDetails.push(tempObj);
    }
    this.selectedRoles = new Array<string>();
  }

  getSelectedValue(status: Boolean, id: string) {

    const role = this.roles.find((eachRole) => eachRole.id === id);
    if (!role) { return; }

    if (status) {
      this.requestObj.newUserDetails?.sportsDetails[0].roles.push(role.id);
      this.selectedRoles?.push(role.value);
      return;
    }

    const indexInRole = this.requestObj.newUserDetails?.sportsDetails[0].roles.indexOf(id);
    const indexInSelectedRole = this.selectedRoles?.indexOf(role.value);

    indexInRole && this.isValidIndex(indexInRole) && this.requestObj.newUserDetails?.sportsDetails[0].roles.splice(indexInRole, 1);
    this.isValidIndex(indexInSelectedRole) && this.selectedRoles?.splice(indexInSelectedRole, 1);
  }

  /* ============================== FORM METHODS ==================================== */

  checkWidth(id: string): string {
    let labelElement = $('#label_' + id);
    let labelWidth = labelElement.innerWidth();
    let formInput = $('.form-input');
    let formInputWidth = formInput.innerWidth();

    let inputFieldWidth = (formInputWidth && labelWidth) ? (formInputWidth - labelWidth) * 0.9 : 60;
    return inputFieldWidth + 'px';
  }

  changeSport() {
    const rolesArr = this.sportsMap.sportMappings.find((eachMap) => {
      return eachMap.sport && eachMap.sport === this.requestObj.newUserDetails?.sportsDetails[0].sport
    });

    if (rolesArr) { this.roles = rolesArr.roles; }
  }




  /* ============================== ROUTE METHODS ==================================== */

  backToHome() {
    this.requestObjEmitter.emit(null);
  }

  signUp() {

    this.signUpForm.onSubmit({} as any);

    const isValidForm = this.checkForFormValidity(this.signUpForm);
    if (!isValidForm) {
      alert("error!");
      return;
    }


    this.updateNewUser();
    console.log('Request Details:   ', this.requestObj);
    this.cacheService.setUserDetails(this.requestObj.newUserDetails);
    this.router.navigate(['/user-home']);

  }

  updateNewUser() {
    this.requestObj.newUserDetails?.sportsDetails.forEach((eachSportDetail) => {
      const team = eachSportDetail.teams[0];
      if (team.indexOf(',') > 0) {
        const teamNames = team.split(',');
        eachSportDetail.teams = new Array<string>();
        eachSportDetail.teams = [...teamNames];
      }
    });
  }
}
