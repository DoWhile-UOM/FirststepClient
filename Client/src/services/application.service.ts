import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';
import { A } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor() {}

  async submitSeekerApplication(applicationData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        Apipaths.submitApplication,
        applicationData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error submiting application: ', error);
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

  //get application status bu advertisment id and seeker id
  async getApplicationStatus(advertisement_id: number, seeker_id: number) {
    let applicationStatusDetails: any = {};
    await axios.get(Apipaths.getApplicationStatus + advertisement_id + '&seekerId=' + seeker_id)
      .then((response) => {
        applicationStatusDetails = response.data;
      })
      .catch((error) => {
        console.error('Error fetching application status:', error);
      });

    return applicationStatusDetails;
  }


}


