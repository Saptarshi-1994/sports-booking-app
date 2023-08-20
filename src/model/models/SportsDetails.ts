import * as models from './models';

export class SportsDetails {

    sport: string;

    roles: Array<string>;

    teams: Array<string>;

    rating: number;

    constructor() {
       this.sport = '';
       this.roles = new Array<string>();
       this.teams = new Array<string>();
       this.rating = 0;
    }

}