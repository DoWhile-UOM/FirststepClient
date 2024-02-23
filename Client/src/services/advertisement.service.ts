import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AdvertisementServices {

  constructor() { }

  async getAllAdvertisements() {
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisements)
      .then(function (response) {
        try {
          jobList = response.data;
          
          for (let i = 0; i < jobList.length; i++) {
            var postDate = new Date(jobList[i].posted_date);
            jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          }
        }
        catch (error) {
          console.log("No advertisements found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return jobList;
  }

  async addNewJob(job: any) {
    let response: any = null;

    await axios.post(Apipaths.addNewJob, job)
      .then(function (res) {
        response = res;
      })
      .catch(function (error) {
        alert('Network Error: ' + error);
      });

    console.log("Error " + response);
    //return response;
  }

  async getCompanyProfile(company_id: string) {
    let company: any;
    let jobList: any = [];

    await axios.get(Apipaths.getCompanyProfile + company_id)
      .then(function (response) {
        try {
          company = response.data;
          jobList = company.advertisementUnderCompany;
          
          for (let i = 0; i < jobList.length; i++) {
            var postDate = new Date(jobList[i].posted_date);
            jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          }

          company.advertisementUnderCompany = jobList;
        }
        catch (error) {
          console.log("No advertisements found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );
    
    return company;
  }

  async getAllAdvertisementsByCompanyID(company_id: string, filterby: string) {
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisementsByCompanyID + company_id + "/filterby=" + filterby)
      .then(function (response) {
        try {
          jobList = response.data;
          
          // validate posted date
          for (let i = 0; i < jobList.length; i++) {
            var postDate = new Date(jobList[i].posted_date);
            jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          }
        }
        catch (error) {
          console.log("No advertisements found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return jobList;
  }

  async getAdvertisementById(jobID: string) {
    let adData: any = {};

    await axios.get(Apipaths.getJobDetails + jobID)
      .then(function (response) { 
        adData = response.data;

        try {
          var postDate = new Date(adData.posted_date);
          console.log(adData.posted_date);
          adData.posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          
          var submissionDate = new Date(adData.submission_deadline);
          adData.submission_deadline = submissionDate.toLocaleString('default', { month: 'short' }) + " " + submissionDate.getDate() + ", " + submissionDate.getFullYear();
  
          if (adData.is_experience_required == "1") {
            adData.is_experience_required = "Required";
          }
          else{
            adData.is_experience_required = "Not Required";
          }
          
        } catch (error) {
          console.log("No advertisement found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );
    
    return adData;
  }

  async closeAdvertisement(jobID: string) {
    let response: any = null;

    await axios.put(Apipaths.closeJob + jobID)
      .then(function (res) {
        response = res;
      })
      .catch(function (error) {
        alert('Network Error: ' + error);
      });

    return response;
  }

  async deleteAdvertisement(jobID: string) {
    let response: any = null;

    await axios.delete(Apipaths.deleteJob + jobID)
      .then(function (res) {
        response = res;
      })
      .catch(function (error) {
        alert('Network Error: ' + error);
      });

    return response;
  }
}
