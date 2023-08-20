import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RequestTeamComponent } from './request-team/request-team.component';
import { RequestPlayerComponent } from './request-player/request-player.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'user-home', component: UserHomeComponent },
  { path: 'user-selection', component: UserSelectionComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'request-team', component: RequestTeamComponent },
  { path: 'request-player', component: RequestPlayerComponent },
  { path: 'request-details', component: RequestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
