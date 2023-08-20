import { Component, OnInit } from '@angular/core';

import * as models from './../../model/index';
import { Constants } from '../common/constants';
import { RouteUtilService } from '../common/services/route-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly Constants = Constants;

  readonly landscapeImg = '../../assets/images/cricket/cricket-opening-img.jpg';
  readonly portraitImg = '../../assets/images/cricket/cricket-img-7.jpg';

  requestObj: models.LoginDetails | undefined;
  imageSource: string | undefined;

  constructor(
    private routeUtilService: RouteUtilService
  ) {

  }

  ngOnInit(): void {
    this.imageSource = (window.innerHeight > window.innerWidth) ? this.portraitImg : this.landscapeImg;
  }

  login() {
    this.requestObj = new models.LoginDetails();
    this.requestObj.isGuest = false;
    delete(this.requestObj.newUserDetails);
  }

  signup() {
    this.requestObj = new models.LoginDetails();
    this.requestObj.isGuest = true;
    delete(this.requestObj.existingUserDetails);
  }

  updateRequestObj(event: any) {
    this.requestObj = event;
  }
}
