import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  async submitSeekerApplication(applications: any) {
    try{
      await axios.post(Apipaths.submitApplication, applications)
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  // async getAllApplicationsbyAdvertisementID(job_id: number) {
  //   let applicationList: any = [];
  
  //   await axios.get(Apipaths.getAllApplications + job_id)
  //     .then(function (response) {
  //       try {
  //         applicationList = response.data;
  //       }
  //       catch (error) {
  //         console.log("No applications found");
  //       }
  //     })
  //     .catch(
  //       function (error) {
  //         alert('Network Error: ' + error);
  //       }
  //     );
  
  //   return applicationList;
}


