import * as models from './models';

export class UserDetails implements Object {

    userName: string;

    password: string;

    userId: string;
    
    firstName: string;

    lastName: string;

    dateOfBirth: string;

    address: string;

    contactNumber: string;

    sportsDetails: Array<models.SportsDetails>;

    constructor() {
        this.userName = '';
        this.password = '';
        this.userId = '';
        
        this.firstName = '';
        this.lastName = '';
        this.dateOfBirth = '';
        this.address = '';
        this.contactNumber = '';
        this.sportsDetails = new Array<models.SportsDetails>();
    }
}