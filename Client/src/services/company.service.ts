import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }


  private baseUrl:string="https://localhost:7213/api/Company"


  CompanyRegister(companyObj:any){
    return this.http.post<any>(this.baseUrl+"/AddCompany",companyObj)
  }

  //Get company Registration state details---Start
  async getCompnayRegStateOld(id: number): Promise<any | null> {
    try {
      const response = await this.http.get<any>(`https://localhost:7213/api/Company/GetCompanyById/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching company data:', error);
      return null; // Indicate error by returning null
    }
  }
  //Get company Registration state details---End

  async getCompnayRegState(id: number) {
    let cmpData: any;
    try{
      await axios.get('https://localhost:7213/api/Company/GetCompanyById/' + id)
        .then((response) => {
          cmpData = response.data;
          //console.log('Company Data:', cmpData);
        });
    }
    catch (error) {
      //console.error(error);
    }

    return cmpData;
 }


}
