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

  async getApplicationDetails(applicationId: number): Promise<any> {
    try {
      const response = await axios.get(`https://localhost:7213/api/Application/GetSeekerApplicationViewByApplicationId/${applicationId}`);
      console.log('API response:', response.data); // Debugging statement
      return response.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      throw error;
    }
  }

  async getRevisionHistory(applicationId: number): Promise<any> {
    try {
      const response = await axios.get(`https://localhost:7213/api/Application/ApplicationGetRevisionHistory/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching revision history:', error);
      throw error;
    }
  }

  async addComment(applicationId: number, comment: string): Promise<any> {
    try {
      const response = await axios.post(`https://localhost:7213/api/Application/AddRevision`, {
        application_id: applicationId,
        comment: comment,
        status: 'New', // have to change status
        employee_id: 1 // replace with the actual employee_id
      });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
}
