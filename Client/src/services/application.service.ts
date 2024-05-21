import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  async submitSeekerApplication(formData:FormData) {
    try{
      const response= await axios.post(Apipaths.submitApplication, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log(response.data);
      return response.data;

    }catch(error){
      console.error('Error submitting application:', error);
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


