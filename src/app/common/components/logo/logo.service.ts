import { Injectable } from "@angular/core";

import { Constants } from '../../constants';
import * as models from '../../../../model/models/models';
import { CacheService } from '../../services/cache-service';

@Injectable()
export class LogoService {

    readonly Constants = Constants;

    readonly defaultLogoPath = '../../../../assets/icons/balls-sports.png';
    readonly cricketLogoPath = '../../../../assets/icons/cricket-logo.png';
    readonly footballLogoPath = '../../../../assets/icons/football-logo.png';

    constructor(public cacheService: CacheService) {
    }

    // map logo with sport (logo icons must be 24px only for this component)
    mapLogoWithSport(userDetails: models.UserDetails | undefined): string {

        const sportName = this.getUserSport(userDetails);

        switch(sportName.toUpperCase()) {

            case this.Constants.SPORTS_NAME_CRICKET: return this.cricketLogoPath;
            case this.Constants.SPORTS_NAME_FOOTBALL: return this.footballLogoPath;

            default: return this.defaultLogoPath;

        }

    }

    getUserSport(userDetails: models.UserDetails | undefined): string {

        if (!userDetails || userDetails === undefined) return '';
        if (!userDetails.sportsDetails || userDetails.sportsDetails.length === 0) return '';

        const selectedSport = this.cacheService.getSelectedSport();
        if (selectedSport)
            return selectedSport;
        else
            return userDetails.sportsDetails[0].sport;
    }

    // validate User details to return to Login or stay
    validateUserDetails() {

    }
}