import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  //Get company Registration state details---Start
  async getCompnayRegState(id: number) {
    let cmpData: any;

    this.http.get('https://localhost:7213/api/Company/GetCompanyById/'+id)
      .subscribe(data => {
        // Handle successful response with the data
        //console.log(data);
      }, error => {
        // Handle error scenario
        console.error(error);
      });

    return cmpData;
  }
  //Get company Registration state details---End


}
