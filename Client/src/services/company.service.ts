import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';
import { HttpClient } from '@angular/common/http';

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
  verified_system_admin_id: number;
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
  verified_system_admin_id: number;
}
interface EvaluatedCompanyDetails {
  company_id: number;
  verification_status: boolean;
  comment: string | null;
  company_registered_date: Date;
  verified_system_admin_id: number;
}
interface CmpAdminReg {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root',
})

export class CompanyService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

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
      });

    console.log(companyDetails);
    return companyDetails;
  }

  async getCompanyApplicationById(companyId: number) {
    let companyApplication: any = {};
    console.log('from service', companyId);
    try {
      await axios
        .get(Apipaths.getCompanyApplicationById + companyId)
        .then(function (response) {
          try {
            companyApplication = response.data;
          } catch (error) {
            console.log('No company application found for the given id');
          }
        })
        .catch((error) => {
        });
      return companyApplication;
    } catch (error) {
      console.log('No company application found for the given id');
    }
  }

  async CompanyRegister(companyObj: any) {
    try {
      const response = await axios.post(Apipaths.registerCompany, companyObj);
      //this.snackBar.open('Company registered successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      return { success: true, out: response.data };
    } catch (error: any) {
      console.error('Network Error: ', error);
      return { success: false, out: error.response.data };

    }
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
        this.snackBar.open('Company details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
        console.log('Network Error: ' + error);
      });
  }

  async updateCompanyApplicationById(
    evaluatedCompanyDetails: EvaluatedCompanyDetails,
    companyId: number
  ) {
    evaluatedCompanyDetails.company_id = companyId; // should be changed
    await axios
      .put(
        Apipaths.updateCompanyApplicationById + companyId,
        evaluatedCompanyDetails
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  async deleteAccount(companyId: number) {
    let response: any;

    await axios
      .delete(Apipaths.deleteCompany + companyId)
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
      });

    return response;
  }

  async getAllCompanyList() {
    let companyList: CompanyList[] = [];

    try {
      const response = await axios.get(Apipaths.getAllComapanyList);
      companyList = response.data;
      console.log('company list was received');
    } catch (error) {
    }

    return companyList;
  }


  async getCompnayRegState(id: string) {
    let cmpData: any;
    try {
      await axios.get(Apipaths.getCompanyRegState + id)
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
  
  //Get company Registration state details---End

  //Registration company state view Start here
  //Registration company state view ends here



  //post company admin registration
  // async postCompanyAdminReg(adminRegData: CmpAdminReg, type:string, cmpID:string) {
  //   try {
  //     const response = await axios.post(Apipaths.postCompanyAdminReg, adminRegData);
  //     console.log('Company Admin Registration Successful');
  //   } catch (error) {
  //     console.log('Network Error: ' + error);
  //   }
  // }
  
  async postCompanyAdminReg(adminRegData: CmpAdminReg, type: string, companyId: string) {
    try {
      const response = await axios.post(Apipaths.postCompanyAdminReg, {
        ...adminRegData,
        type: type,
        company_id: companyId
      });
      console.log('Company Admin Registration Successful');
    } catch (error) {
      console.log('Network Error: ' + error);
    }
  }

  async updateUnregCompanyDetails(company: any,id:string) { // should be chnaged
    
    let companyId=company.company_id;
    //console.log('from service', company);
    await axios
      .put(Apipaths.updateUnregComapny + id,company) // tem slotion
      .then((response) => {
        this.snackBar.open('Company details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
        console.log('Network Error: ' + error);
      });
  }

}

