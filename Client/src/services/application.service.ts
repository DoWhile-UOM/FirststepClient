import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor() {}

  async submitSeekerApplication(applications: any) {
    try {
      await axios
        .post(Apipaths.submitApplication, applications)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async getApplicationList(job_number: number, status: string) {
    let applicationList: any = {};
    await axios.get(`https://localhost:7213/api/Application/GetApplicationList/JobID=${job_number}/status=${status}`)
      .then((response) => {
        applicationList = response.data;
      })
      .catch((error) => {
        //console.error(error);
      });

    return applicationList;
  }

  // async getApplicationDetails(applicationId: number): Promise<any> {
  //   try {
  //     const response =
  //     // const response = await axios.get(`https://localhost:7213/api/Application/GetSeekerApplicationViewByApplicationId/${applicationId}`);
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching application details:', error);
  //   }
  // }

  async getApplicationDetails(applicationId: number) {
    let applicationDetails: any = {};
    await axios
      .get('https://localhost:7213/api/Application/GetSeekerApplicationViewByApplicationId/' + applicationId)
      .then(function (response) {
        try {
          applicationDetails = response.data;
        } catch (error) {
          console.log('No application details found for the given id');
        }
      })
      .catch((error) => {
        console.log('Network Error: ' + error);
      });

    return applicationDetails;
  }


}
