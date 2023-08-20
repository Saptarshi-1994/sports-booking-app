import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { LogoComponent } from './common/components/logo/logo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CacheService } from './common/services/cache-service';
import { LogoService } from './common/components/logo/logo.service';

import { RequestPlayerComponent } from './request-player/request-player.component';
import { RequestTeamComponent } from './request-team/request-team.component';
import { PlayerDetailsComponent } from './common/components/player-details/player-details.component';
import { PaginationComponent } from './common/components/pagination/pagination.component';
import { RatingComponent } from './common/components/rating/rating.component';
import { MockService } from './common/services/mock.service';
import { RequestModalComponent } from './common/components/request-modal/request-modal.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestIndvComponent } from './request-details/request-indv/request-indv.component';
import { RouteUtilService } from './common/services/route-util.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SportsMaps } from './common/maps/sports-maps';
import { BaseComponent } from './common/components/base/base.component';
import { ClickOutsideDirective } from './common/directives/click-outside.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    UserSelectionComponent,
    LogoComponent,
    UserProfileComponent,
    RequestPlayerComponent,
    RequestTeamComponent,
    PlayerDetailsComponent,
    PaginationComponent,
    RatingComponent,
    RequestModalComponent,
    RequestDetailsComponent,
    RequestIndvComponent,
    BaseComponent,

    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CacheService,
    LogoService,
    MockService,
    HttpClient,
    RouteUtilService,
    SportsMaps
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
