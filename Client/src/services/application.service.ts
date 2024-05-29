import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';
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
}
