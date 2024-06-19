import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalService } from './local.service';
import { Apipaths } from './apipaths/apipaths';
import { catchError, firstValueFrom, lastValueFrom, map, of, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { response } from 'express';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any; //store payload data get from token

  private baseUrl: string = Apipaths.baseUrl + "User";

  constructor(private snackBar: MatSnackBar, private local: LocalService, private http: HttpClient, private route: Router) {
    this.userPayload = this.decodedToken() //call decodedToken() to get payload data
  }

  signup(userObj: any) {
    return this.http.post<any>(Apipaths.register, userObj)
  }

  async login(loginObj: any) {
    return await this.http.post<any>(Apipaths.authenticate, loginObj)
  }

  async ResetPasswordReq(email: string) {
    try {
      const response = await axios.post(Apipaths.resetpasswordReq + email);
      this.snackBar.open('Password Reset link sent to your Email', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    } catch (error) {
      this.snackBar.open('Error Occured on Password Reset', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }


  async ResetPasswordReqNew(email: string) {
    let response: any;

    await axios.post(Apipaths.resetpasswordReq + email)
      .then((res) => {
        response = res.data;
        this.snackBar.open("Password Reset Email has been sent to your mailbox", "", { panelClass: ['app-notification-normal'] })._dismissAfter(5000);
      })
      .catch((error) => {
        this.snackBar.open(error.response.data, "", { panelClass: ['app-notification-error'] })._dismissAfter(5000);

      });

  }

  async ResetPasswordNew(restPassword: any) {
    let response: any;

    await axios.post(Apipaths.resetpassword, restPassword)
      .then((res) => {
        response = res.data;
        this.snackBar.open("Your password has been reset successfully.", "", { panelClass: ['app-notification-normal'] })._dismissAfter(5000);
      })
      .catch((error) => {
        this.snackBar.open(error.response.data, "", { panelClass: ['app-notification-error'] })._dismissAfter(5000);

      });

  }

  async ResetPassword(restPassword: any) {
    let action: boolean = false;
    await axios.post(Apipaths.resetpassword, restPassword)
      .then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
          action = true;
        }
      })
      .catch(
        (error) => {
          console.log("No advertisements found" + error);
          this.snackBar.open(error.response.data.message, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
        }
      );
    if (action) {
      this.snackBar.open('Password Reset Sucessful', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      return action;
    } else {
      return action;
    }
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

  getName() {//Get First Name from token
    if (this.userPayload)
      return this.userPayload.given_name
  }

  getCompanyName() {//Get Organization from token 
    if (this.userPayload)
      return this.userPayload.CompanyName
  }

  getUserId() {//Get UserID from token 
    if (this.userPayload)
      return this.userPayload.nameid
  }

  getCompanyID() {//Get Organization ID from token
    if (this.userPayload)
      return this.userPayload.CompanyID
  }

  async getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude });
          }, err => {
            reject(err);
          });
        } else {
          reject(null);
        }
      }
      catch (err) {
        reject(null);
      }
    });
  }
}
