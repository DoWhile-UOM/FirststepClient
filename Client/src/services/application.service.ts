import { Injectable, booleanAttribute } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface ApplicationStatusCount {
  status: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private snackbar: MatSnackBar) {}

  async submitSeekerApplication(applicationData: FormData): Promise<boolean> {
    let response = false;

    await axios.post(
      Apipaths.submitApplication,
      applicationData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ).then(function (res) {
      response = true;
    })
    .catch(
      (error) => {
        if (error.response.status == 409) {
          this.snackbar.open("Can't Resubmit an application", "",{panelClass: ['app-notification-warning']})._dismissAfter(5000);
        }
        else {
          this.snackbar.open("Error occurred submitting application :" + error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
        response = false;
      }
    );

    return response;
  }

  async resubmitSeekerApplication(applicationData: FormData): Promise<boolean> {
    let response = false;

    await axios.put(
      Apipaths.resubmitApplication,
      applicationData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ).then(function (res) {
      response = true;
    })
    .catch(
      (error) => {
        this.snackbar.open("Error occurred submitting application :" + error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        response = false;
      }
    );

    return response;
  }

  async changeAssignedHRA(application_id: number, hra_id: number) {
    await axios
      .patch(
        Apipaths.changeAssignedHRA +
          'applicationId=' +
          application_id +
          '/hraId=' +
          hra_id
      )
      .then((response) => {
        this.snackbar
          .open('Sucessfully Change Talent Acquisition Specialist!', '', {
            panelClass: ['app-notification-normal'],
          })
          ._dismissAfter(3000);
      })
      .catch((error) => {
        this.snackbar
          .open('Error: ' + error, '', {
            panelClass: ['app-notification-error'],
          })
          ._dismissAfter(3000);
      });
  }

  async getAssignedApplicationList(
    hra_id: number,
    jobId: number,
    status: string
  ) {
    let applicationList: any = {};
    await axios
      .get(
        Apipaths.getassignedApplications +
          'hraId=' +
          hra_id +
          '/JobID=' +
          jobId +
          '/status=' +
          status
      )
      .then((response) => {
        applicationList = response.data;
      })
      .catch((error) => {
        this.snackbar
          .open('Error: ' + error, '', {
            panelClass: ['app-notification-error'],
          })
          ._dismissAfter(3000);
      });

    return applicationList;
  }

  async getApplicationList(job_number: number, status: string) {
    let applicationList: any = {};
    const url = `${Apipaths.getApplicationList}JobID=${job_number}/status=${status}`;
    await axios
      .get(url)
      .then((response) => {
        applicationList = response.data;
      })
      .catch((error) => {
        this.snackbar.open('Failed to load application list', 'Close', {
          duration: 3000,
        });
        console.error("Network Error: " + error);
      });


    return applicationList;
  }

  //get application status bu advertisment id and seeker id
  async getApplicationStatus(advertisement_id: number, seeker_id: number) {
    let applicationStatusDetails: any = {};
    await axios
      .get(
        Apipaths.getApplicationStatus +
          advertisement_id +
          '&seekerId=' +
          seeker_id
      )
      .then((response) => {
        applicationStatusDetails = response.data;
        //format date
        var submittedDate = new Date(applicationStatusDetails.submitted_date);
        applicationStatusDetails.submitted_date =
          submittedDate.toLocaleString('default', { month: 'short' }) +
          ' ' +
          submittedDate.getDate() +
          ', ' +
          submittedDate.getFullYear();
      })
      .catch((error) => {
        console.error('Error fetching application status:', error);
      });

    return applicationStatusDetails;
  }

  async getApplicationDetails(applicationId: number) {
    let applicationDetails: any = {};
    await axios
      .get(Apipaths.getSeekerApplicationDetails +applicationId)
      .then((response) => {
        applicationDetails = response.data;
      })
      .catch((error) => {
        //console.error(error);
      });

    return applicationDetails;
  }

  async delegateTask(jobID: number, hraIds: string): Promise<void> {
    const url = `${Apipaths.delegateTask}jobID=${jobID}/hra_id_list=${hraIds}`;
    await axios.patch(url, {})
      .then(() => {
        this.snackbar.open('Tasks assigned successfully.', '', { panelClass: ['app-notification-success'] })._dismissAfter(3000);
      })
      .catch((error) => {
        this.snackbar.open('Error: ' + error, '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });
  }


  //Average Time
  async getAverageTimes(companyId: number): Promise<any> {
    try {
      const response = await axios.get( Apipaths.getAverageTime + companyId);
      return response.data;
    } catch (error) {
      this.snackbar.open('Failed to load average times', 'Close', {
        duration: 3000,
      });
      console.error("Network Error: " + error);
      throw error;
    }
  }

  
  async getApplicationStatusCount(company_id: string): Promise<ApplicationStatusCount[]> {
    try {
      const response = await axios.get(Apipaths.getApplicationStatusCount + company_id);
      return response.data;
    } catch (error) {
      console.error('Error fetching application status count:', error);
      throw error;
    }
  }


  async getApplicationCount(advertisement_id: number) {
    let applicationCount: any = {};
    await axios
      .get(Apipaths.getApplicationCount + advertisement_id)
      .then((response) => {
        applicationCount = response.data;
      })
      .catch((error) => {
        console.error('Error fetching application count:', error);
      });

    return applicationCount;
  }

}
