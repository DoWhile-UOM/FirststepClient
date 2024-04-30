import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalService } from './local.service';
import { Apipaths } from './apipaths/apipaths';
import { catchError, firstValueFrom, lastValueFrom, map, of, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any; //store payload data get from token

  private baseUrl: string = "https://localhost:7213/api/User"

  constructor(private local: LocalService, private http: HttpClient, private route: Router) {
    this.userPayload = this.decodedToken() //call decodedToken() to get payload data
  }

  signup(userObj: any) {
    return this.http.post<any>(Apipaths.register, userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(Apipaths.authenticate, loginObj)
  }

  //-----OTP Service----------------------------------

  async requestOTP(userData: any) {
    let action: boolean = false;
    await axios.post(Apipaths.requestOTP, userData)
      .then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
          action = true;
        }
      })
      .catch(
        (error) => {
          console.log("No advertisements found" + error);
        }
      );
    return action;
  }

  //--------request

  async verifyOTP(userData: any) {
    let action: boolean = false;
    await axios.post(Apipaths.verifyOTP, userData)
      .then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
          action = true;
        }
      })
      .catch(
        (error) => {
          console.log("Error Occured" + error);
        }
      );
    return action;
  }

  //-----OTP Service End here---------------------------

  storeToken(token: string) {
    //console.log('Token Stored')
    this.local.saveData('token', token)
    //localStorage.setItem('token',token)
    //console.log('Token is '+localStorage.getItem('token'))
  }

  storeRefreshToken(tokenValue: string) {
    //localStorage.setItem('refreshToken', tokenValue)
    this.local.saveData('refreshToken', tokenValue)
  }

  getToken() {
    //console.log("Test");
    //localStorage.setItem('token', '')
    return this.local.getData('token');
  }


  getrefToken() {
    //console.log("Test");
    //localStorage.setItem('token', '')
    return this.local.getData('refreshToken');
  }

  isLoggedIn() {

    try {
      return !!this.local.getData('token');
    } catch (error) {
      //console.log(error); //raises the error
      return false;
    }
  }

  signOut() {
    this.local.clearData();
    this.route.navigate(['login'])
  }


  decodedToken() {

    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const rtoken = this.getrefToken()!;
    //console.log('Token decoder '+token);
    //console.log(jwtHelper.decodeToken(token))
    this.userPayload = jwtHelper.decodeToken(token);
    return jwtHelper.decodeToken(token)
  }

  getRole() {
    if (this.userPayload)
      return this.userPayload.role
  }

  getFirstName() {//Get First Name from token
    if (this.userPayload)
      return this.userPayload.given_name
  }

  getLastName() {//Get Last Name from token
    if (this.userPayload)
      return this.userPayload.family_name
  }

  getOragnizationName() {//Get Organization from token 
    if (this.userPayload)
      return this.userPayload.website
  }

  getUserId() {//Get UserID from token 
    if (this.userPayload)
      return this.userPayload.nameid
  }

}
