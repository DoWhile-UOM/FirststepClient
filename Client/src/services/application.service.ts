import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';
import { A } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private snackbar: MatSnackBar) {}

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

  async changeAssignedHRA(application_id: number, hra_id: number) {
    await axios.patch(Apipaths.changeAssignedHRA + 'applicationId=' + application_id + '/hraId=' + hra_id)
      .then((response) => {
        this.snackbar.open("Sucessfully Change HR Assistant!", '', { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
        this.snackbar.open('Error: ' + error, '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });
  }

  async getAssignedApplicationList(hra_id: number, jobId: number, status: string) {
    let applicationList: any = {};
    await axios.get(Apipaths.getassignedApplications + 'hraId=' + hra_id + '/JobID=' + jobId + '/status=' + status)
      .then((response) => {
        applicationList = response.data;
      })
      .catch((error) => {
        this.snackbar.open('Error: ' + error, '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });

    return applicationList;
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
}