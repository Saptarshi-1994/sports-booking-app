
import * as models from './models';

export class LoginDetails {

    isGuest: boolean | null;

    existingUserDetails?: models.UserDetails;

    newUserDetails?: models.UserDetails;

    constructor() {
        this.isGuest = null;
        this.existingUserDetails = new models.UserDetails();
        this.newUserDetails = new models.UserDetails();
    }

}