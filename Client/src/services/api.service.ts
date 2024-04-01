import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<any>(Apipaths.UserBaseUrl);
  }
}
