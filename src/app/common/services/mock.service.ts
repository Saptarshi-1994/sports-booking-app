// src/app/user.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

import * as usersData from '../../../assets/mock/users.json';
import * as loginData from '../../../assets/mock/loginDetails.json';

@Injectable({
    providedIn: 'root'
})

export class MockService {

    playerData = usersData;
    loginData = loginData;

    // constructor(private http: HttpClient) { }

    getLoginDetails(userName: string, password: string): Observable<any> {
        return of(this.loginData.responsePayLoad);
    }

    getPlayers(): Observable<any> {
        return of(this.playerData.responsePayLoad);
    }
}