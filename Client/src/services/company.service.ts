import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';
interface Company {
  company_id: number;
  company_name: string;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  company_logo: string;
  company_description: string;
  company_city: string;
  company_province: string;
  company_business_scale: string;
}
interface CompanyList {
  company_id: number;
  company_name: string;
  verification_status: boolean;
}
interface CompanyApplication {
  company_id: number;
  company_name: string;
  verification_status: boolean;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  business_reg_certificate: string;
  certificate_of_incorporation: string;
  comment: string;
}
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private snackBar: MatSnackBar) {}

  async getCompanyDetails(companyId: number) {
    let companyDetails: any = {};

    await axios
      .get(Apipaths.getCompanyDetails + companyId)
      .then(function (response) {
        try {
          companyDetails = response.data;

          console.log();
        } catch (error) {
          console.log('No company details found for the given id');
        }
      })
      .catch((error) => {
        this.snackBar.open('Network error occurred. Try Again', 'Close', {
          duration: 3000,
        });
      });

    console.log(companyDetails);
    return companyDetails;
  }
  async getCompanyApplicationById(companyId: number) {
    let companyApplication: any = {};
    await axios
      .get(Apipaths.getCompanyApplicationById + companyId)
      .then(function (response) {
        try {
          companyApplication = response.data;
        } catch (error) {
          console.log('No company application found for the given id');
        }
      });
  }

  // async updateCompanyDetails(company: Company) {
  //   await axios
  //     .put(Apipaths.updateCompanyDetails + company_id, company)
  //     .then(function (response) {
  //       console.log('Company details updated successfully');
  //     })
  //     .catch(function (error) {
  //       alert('Network Error: ' + error);
  //     });
  // }

  async updateCompanyDetails(company: Company, company_id: number) {
    company.company_id = company_id; // should be chnaged
    console.log('from service', company);
    await axios
      .put(Apipaths.updateCompanyDetails + company_id, company) // tem slotion
      .then((response) => {
        this.snackBar.open('Company details updated successfully', "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
      })
      .catch((error) => {
        this.snackBar.open('Network error occurred. Try Again', 'Close', {
          duration: 3000,
        });
      });
  }

  async deleteAccount(companyId: number) {
    let response: any;

    await axios
      .delete(Apipaths.deleteCompany + companyId)
      .then((res) => {
        response = res.data;
        this.snackBar.open('Company account deleted successfully', 'Close', {
          duration: 3000,
        });
      })
      .catch((error) => {
        this.snackBar.open('Network error occurred. Try Again', 'Close', {
          duration: 3000,
        });
      });

    return response;
  }

  //get all company list from companyListDto
  async getAllCompanyList() {
    let companyList: CompanyList[] = [];

    try {
      const response = await axios.get(Apipaths.getAllComapanyList);
      companyList = response.data;
      console.log('company list was received');
    } catch (error) {
      this.snackBar.open('Network error occurred. Try Again', 'Close', {
        duration: 3000,
      });
    }

    return companyList;
  }

  /*
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
  */
  //Get company Registration state details---End
}
