import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache-service';
import { SportsMaps } from '../../maps/sports-maps';
import { NgForm } from '@angular/forms';

import * as models from '../../../../model/models/models';
import { Constants } from '../../constants';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  readonly Constants = Constants;

  userDetails?: models.UserDetails;

  constructor(
    @Optional() protected router: Router | null,
    @Optional() protected cacheService: CacheService | null,
    @Optional() protected sportsMap: SportsMaps | null
  ) {
    
  }

  validateUser() {
    this.userDetails = this.cacheService?.getUserDetails();
    if (!this.userDetails) {
      this.cacheService?.clearCacheLogOut();
      this.router?.navigate(['/home']);
    }
  }


  /* =======================  COMMON Utility METHODS ========================== */
  isValidIndex(numVal: number | undefined): boolean {
    if (numVal === undefined) { return false; }
    if (numVal.toString() === '0') { return true; }
    if (numVal > 0) { return true; }
    return false;
  }


  /* =======================  COMMON Form METHODS ========================== */

  checkFormErrors(form:NgForm, id: string): any {

    const isSubmitted = form.submitted;
    if (!isSubmitted) { return false; }

    const isFormControlPristine = form.form.controls[id].pristine;
    const hasFormErrors = form.form.controls[id].errors;

    if (isSubmitted && isFormControlPristine) { return true; }
    if (isSubmitted && !isFormControlPristine && hasFormErrors) { return true; }
  }

  checkForFormValidity(parentForm: NgForm): boolean {

    if (parentForm.pristine) { return false; }

    const keys = Object.keys(parentForm.form.controls);
    let result = true;
    if (keys && keys.length > 0) {

      keys.forEach((eachKey) => {
        
        const formControl = parentForm.form.controls[eachKey];

        if (formControl.status !== Constants.FORM_STATUS_DISABLED) {
          if ((formControl.touched || formControl.dirty) && formControl.pristine) { result = false; }
          else if (formControl.errors) { result = false; }
        }
      })
    }

    return result; 
  }

}
