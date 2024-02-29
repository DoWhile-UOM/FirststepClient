import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7213/api/User"
  constructor(private http:HttpClient,private route:Router) { }

  signup(userObj:any){
    return this.http.post<any>(this.baseUrl+"/register",userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseUrl+"/authenticate",loginObj)
  }

  storeToken(token:string){
    console.log(localStorage.getItem('token'))
    localStorage.setItem('token',token)
    //console.log(localStorage.getItem('token'))
  }

  getToken(){
    return localStorage.getItem('token')
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


}
