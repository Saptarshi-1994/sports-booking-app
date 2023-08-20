import { Injectable } from "@angular/core";

@Injectable()
export class SportsMaps {

    constructor() {

    }

    readonly sportsList = [
        {
            id: 'CRICKET',
            value: 'Cricket'
        },
        {
            id: 'FOOTBALL',
            value: 'Football'
        }
    ];

    readonly sportMappings = [

        // for cricket
        {
            sport: 'CRICKET',
            roles: [
                {
                    id: 'BATSMAN',
                    value: 'Batsman',
                    checked: false
                },
                {
                    id: 'BOWLER',
                    value: 'Bowler',
                    checked: false
                },
                {
                    id: 'WICKET_KEEPER',
                    value: 'Wicket Keeper',
                    checked: false
                },
                {
                    id: 'ALL_ROUNDER',
                    value: 'All Rounder',
                    checked: false
                }  
            ]
        }, 

        // for football
        {
            sport: 'FOOTBALL',
            roles: [
                {
                    id: 'GOAL_KEEPER',
                    value: 'Goal Keeper',
                    checked: false
                },
                {
                    id: 'STRIKER',
                    value: 'Striker',
                    checked: false
                },
                {
                    id: 'MID_FIELDER',
                    value: 'Mid Fielder',
                    checked: false
                },
                {
                    id: 'DEFENDER',
                    value: 'Defender',
                    checked: false
                }  
            ]
        },
    ]
}