import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload:any; //store payload data get from token

  private baseUrl:string="https://localhost:7213/api/User"

  constructor(private http:HttpClient,private route:Router) {
    this.userPayload = this.decodedToken() //call decodedToken() to get payload data
   }

  signup(userObj:any){
    return this.http.post<any>(this.baseUrl+"/register",userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseUrl+"/authenticate",loginObj)
  }

  storeToken(token:string){
    //console.log('Token Stored')
    localStorage.setItem('token',token)
    //console.log('Token is '+localStorage.getItem('token'))
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    //console.log("Test");
    //localStorage.setItem('token', '')
    return localStorage.getItem('token');
  }


  getrefToken(){
    //console.log("Test");
    //localStorage.setItem('token', '')
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(){
    
    try {
      return !!localStorage.getItem('token');
    } catch (error) {
      //console.log(error); //raises the error
      return false;
    }
  }

  signOut(){
    localStorage.clear();
    this.route.navigate(['login'])
  }


  decodedToken(){
    
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const rtoken=this.getrefToken()!;
    //console.log('Token decoder '+token);
    //console.log(jwtHelper.decodeToken(token))
    this.userPayload = jwtHelper.decodeToken(token);
    return jwtHelper.decodeToken(token)
  }

  getRole(){
    if(this.userPayload)
    return this.userPayload.role
  }

  getFullName(){
    if(this.userPayload)
    return this.userPayload.unique_name
  }


}
