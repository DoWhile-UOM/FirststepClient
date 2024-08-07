import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

interface EvaluatedCompanyDetails {
  company_id: number;
  verification_status: boolean;
  comment: string | null;
  company_registered_date: Date;
  verified_system_admin_id: number;
}

interface EligibleUnregisteredCompany {
  company_id: number;
  company_name: string;
  company_email: string;
  company_logo: string;
}

@Injectable({
  providedIn: 'root',
})

export class CompanyService {
  //to share the company list data between components
  private companyListSource = new BehaviorSubject<CompanyList[]>([]);
  currentCompanyList = this.companyListSource.asObservable();

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  public static BusinessScales: any[] = [
    { name: 'Micro-Sized (Lower Than 10 Employees)', value: 'micro' },
    { name: 'Small-Sized (10 - 50 Employees)', value: 'small' },
    { name: 'Medium-Sized (50 - 250 Employees)', value: 'medium' },
    { name: 'Large-Sized (More Than  250 Employees)', value: 'large' },
  ];

  async getCompanyDetails(companyId: number) {
    let companyDetails: any = {};
    try {
      const response = await axios.get(Apipaths.getCompanyDetails + companyId);
      companyDetails = response.data;
    } catch (error) {
    }

    return companyDetails;
  }

  async getCompanyApplicationById(companyId: number) {
    let companyApplication: any = {};
    try {
      await axios
        .get(Apipaths.getCompanyApplicationById + companyId)
        .then(function (response) {
          try {
            companyApplication = response.data;
          } catch (error) {
          }
        })
        .catch((error) => {
        });
      return companyApplication;
    } catch (error) {
    }
  }

  async CompanyRegister(companyObj: any) {
    try {
      const response = await axios.post(Apipaths.registerCompany, companyObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //this.snackBar.open('Company registered successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      return { success: true, out: response.data };
    } catch (error: any) {
      return { success: false, out: error.response.data };

    }
  }

  async updateCompanyLogo(file: File, company_id: number) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('companyId', company_id.toString());
    await axios.patch(Apipaths.updateCompanyLogo + 'companyId=' + company_id, formData).then((response) => {
      this.snackBar.open('Company logo updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    }
    ).catch((error) => {
      this.snackBar.open('Error updating company logo', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    });
  }

  async updateCompanyDetails(company: Company, company_id: number) {
    company.company_id = company_id; // should be chnaged
    await axios
      .put(Apipaths.updateCompanyDetails + company_id, company) // tem slotion
      .then((response) => {
        this.snackBar.open('Company details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
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
        this.snackBar.open('Company was registered successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
        const errorMessage = error.message || 'Unknown error occurred';
        this.snackBar.open(`Error occurred: ${errorMessage}`, "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
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
      // Update the BehaviorSubject with the new data
      this.companyListSource.next(companyList);
    } catch (error) {
      this.snackBar.open('Error fetching company list', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

    return companyList;
  }


  async getCompnayRegState(id: string) {
    let cmpData: any;
    try {
      await axios.get(Apipaths.getCompanyRegState + id)
        .then((response) => {
          cmpData = response.data;
        });
    }
    catch (error) {
      cmpData = false;
    }

    return cmpData;
  }

  async updateUnregCompanyDetails(company: any) { // should be chnaged
    let Id = company.company_id;
    await axios
      .put(Apipaths.updateUnregComapny + Id, company,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }) // tem slotion
      .then((response) => {
        this.snackBar.open('Company details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
      });
  }

  async getEligibleUnregisteredCompanies() {
    let eligibleUnregisteredCompanies: EligibleUnregisteredCompany[] = [];

    try {
      const response = await axios.get(Apipaths.getEligibleUnregisteredCompanies);
      eligibleUnregisteredCompanies = response.data;
    } catch (error) {
      this.snackBar.open('Error fetching eligible unregistered companies', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

    return eligibleUnregisteredCompanies;
  }
}