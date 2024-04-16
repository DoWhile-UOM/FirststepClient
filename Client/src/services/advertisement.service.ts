import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AdvertisementServices {
  public static employment_types: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Volunteer'];
  public static job_arrangement: string[] = ['Remote', 'On-site', 'Hybrid'];

  constructor(private snackBar: MatSnackBar) { }

  async getAllAdvertisements(seekerID: string) {
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisements + '/seekerID=' + seekerID)
      .then( (response) => {
        try {
          jobList = response.data;

          for (let i = 0; i < jobList.length; i++) {
            var postDate = new Date(jobList[i].posted_date);
            jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          }
        }
        catch (error) {
          this.snackBar.open(String(error), "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      })
      .catch(
        (error) => {
          this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async getSeekerHomePage(seeker: string, pageLength: string){
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisements + '/seekerID=' + seeker + '/pageLength=' + pageLength)
      .then(function (response) {
        jobList = response.data;

        for (let i = 0; i < jobList.firstPageAdvertisements.length; i++) {
          var postDate = new Date(jobList.firstPageAdvertisements[i].posted_date);
          jobList.firstPageAdvertisements[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
        }
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async getAllAdvertisementsWithPaginator(seekerID: string, jobIdList: number[]) {
    let jobList: any = [];

    // convert jobIdList into single string
    let jobIdString = jobIdList.join(',');

    await axios.get(Apipaths.getAdvertisements + '/seekerID=' + seekerID + '/advertisements=' + jobIdString)
      .then(function (response) {
        jobList = response.data;

        for (let i = 0; i < jobList.length; i++) {
          var postDate = new Date(jobList[i].posted_date);
          jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
        }
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async addNewJob(job: any) {
    let response: any = null;

    await axios.post(Apipaths.addNewJob, job)
      .then(function (res) {
        response = res;
        return true;
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return true;
  }

  async getCompanyProfile(company_id: string, seekerID: string) {
    let company: any;
    let jobList: any = [];

    await axios.get(Apipaths.getCompanyProfile + company_id + "/seekerID=" + seekerID)
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
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
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
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async getAllAdvertisementsByCompanyIDAndSearch(company_id: string, filterby: string, title: string){
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisementsByCompanyID + company_id + "/filterby=" + filterby + "/title=" + title)
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
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
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
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return adData;
  }

  async activateAdvertisement(jobID: string) {
    this.changeStatus(jobID, "active");
  }

  async holdAdvertisement(jobID: string) {
    this.changeStatus(jobID, "hold");
  }

  async closeAdvertisement(jobID: string) {
    this.changeStatus(jobID, "closed");
  }

  private async changeStatus(jobID: string, status: string) {
    let response: any = null;

    // validate status
    var validStatus = ["active", "hold", "closed"];
    if (!validStatus.includes(status)) {
      this.snackBar.open("Invalid Status", "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
      return response;
    }

    await axios.put(Apipaths.changeStatusOfJob + jobID + "/status=" + status)
      .then(function (res) {
        response = res;
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return response;
  }

  async deleteAdvertisement(jobID: string) {
    let response: any = null;

    await axios.delete(Apipaths.deleteJob + jobID)
      .then(function (res) {
        response = res;
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return response;
  }

  async saveAdvertisement(jobID: string, seekerID: string, isSave: boolean) {
    let response: any = null;

    await axios.put(Apipaths.saveJob + jobID + "/save=" + isSave + "/seekerId=" + seekerID)
      .then(function (res) {
        response = res;
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return response;
  }

  async getSavedAdvertisements(seekerID: string) {
    let jobList: any = [];

    await axios.get(Apipaths.getSavedAdvertisements + seekerID)
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
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async searchAdsBasicAlgo(seekerID: string, searchData: any, pageLength: string){
    let jobList: any = [];

    await axios.post(Apipaths.basicSearch + seekerID + '/pageLength=' + pageLength, searchData)
      .then(function (response) {
        jobList = response.data;

        for (let i = 0; i < jobList.firstPageAdvertisements.length; i++) {
          var postDate = new Date(jobList.firstPageAdvertisements[i].posted_date);
          jobList.firstPageAdvertisements[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
        }
      })
      .catch(
        (error) => {
        this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return jobList;
  }

  async getAdvertisementByIDwithKeywords(jobID: string){
    let adData: any = {};

    await axios.get(Apipaths.getAdvertisementByIDwithKeywords + jobID)
    .then(function (response) {
      adData = response.data;
    })
    .catch(
        (error) => {
        this.snackBar.open(error, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        return null;
      }
    );

    return adData;
  }

  async updateAdvertisement(job: any, jobID: string){
    let response: any = null;

    job.advertisement_id = jobID;

    await axios.put(Apipaths.updateAdvertisement + '/' + jobID, job)
      .then(function (res) {
        response = res;
      })
      .catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return response;
  }
}
