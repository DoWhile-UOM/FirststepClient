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

  async getApplicationDetails(applicationId: number){
    let applicationDetails: any = {};
    await axios.get(`https://localhost:7213/api/Application/GetSeekerApplications/${applicationId}`)
      .then((response) => {
        applicationDetails = response.data;
      })
      .catch((error) => {
        //console.error(error);
      });

    return applicationDetails;
  }

  async addRevision(applicationId: number, comment: string, status: string, employeeId: number) {
    const newRevision = {
      application_id: applicationId,
      comment: comment,
      status: status,
      employee_id: employeeId
    };

    try {
      const response = await axios.post('https://localhost:7213/api/Revision/AddRevision', newRevision);
      console.log('Revision added successfully:', response.data);
    } catch (error) {
      console.error('Error adding revision:', error);
    }
  }

  async getRevisionHistory(applicationId: number) {
    let revisionHistory: any = {};
    await axios.get(`https://localhost:7213/api/Application/GetRevisionHistory/${applicationId}`).then((response) => {
      revisionHistory = response.data;
    }).catch((error) => {
      console.error(error);
    });

    return revisionHistory;
  }
  

  
}
