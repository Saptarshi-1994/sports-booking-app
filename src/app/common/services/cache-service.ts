import { Injectable } from "@angular/core";
import * as models from '../../../model/models/models';

@Injectable()
export class CacheService {

    private userDetails: models.UserDetails | undefined;
    private selectedSport: string | undefined;
    private selectedService: string | undefined;
    private selectedPlayer: models.UserDetails | undefined;


    /* set and get user details from login / signup page to land to home page */
    setUserDetails(userDetails: any) {
        this.userDetails = userDetails;
    }
    getUserDetails(): any {
        return this.userDetails;
    }


    /* set and get the selected sport from user home page */
    setSelectedSport(sport: string | undefined) {
        this.selectedSport = sport;
    }
    getSelectedSport(): any {
        return this.selectedSport;
    }

    /* set and get the selected user service from user selection page */
    setSelectedUserService(action: string | undefined) {
        this.selectedService = action;
    }
    getSelectedUserService(): any {
        return this.selectedService;
    }


    /* set and get the selected player from request player page */
    setSelectedPlayerToRequest(player: models.UserDetails | undefined) {
        this.selectedPlayer = player;
    }
    getSelectedPlayerToRequest(): any {
        return this.selectedPlayer;
    }




    /* clear all cache */
    clearCache() {
        this.selectedSport = undefined;
        this.selectedService = undefined;
        this.selectedPlayer = undefined;
    }

    clearCacheLogOut() {
        this.userDetails = undefined;
        this.clearCache();
    }

}