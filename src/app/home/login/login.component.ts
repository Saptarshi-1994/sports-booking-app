import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as models from './../../../model/index';

import { CacheService } from '../../common/services/cache-service';
import { MockService } from '../../common/services/mock.service';

import { BaseComponent } from '../../common/components/base/base.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  @Input() requestObj = new models.LoginDetails();
  @Output() requestObjEmitter = new EventEmitter<any>();
  @ViewChild('loginForm') loginForm!: NgForm;

  loginDetails: any;

  constructor(
    public override router: Router,
    public override cacheService: CacheService,
    public mockService: MockService) {
    super(router, cacheService, null);
  }

  ngOnInit(): void {
  }

  backToHome() {
    this.requestObjEmitter.emit(null);
  }

  login() {
    this.loginForm.onSubmit({} as any);
    const isValidForm = this.checkForFormValidity(this.loginForm);

    if (!isValidForm) {
      alert('Error!!');
      return;
    }

    console.log('Login Request::::::::  ', this.requestObj);
    this.mockService.getLoginDetails(this.requestObj.existingUserDetails?.userName!, this.requestObj.existingUserDetails?.password!)
      .subscribe((data: any) => {
        this.loginDetails = data;
        if (this.loginDetails) {
          this.cacheService.setUserDetails(this.loginDetails);
          this.router.navigate(['/user-home']);
        }
      });

  }

}
