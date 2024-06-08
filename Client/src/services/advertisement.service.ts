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
  public static experiences: string[] = ['Internship', 'Entry level', 'Associate', 'Mid level', 'Experienced'];

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

  async getCompanyProfile(company_id: string, seekerID: string, pageLength: string) {
    let company: any;
    let jobList: any = [];

    await axios.get(Apipaths.getCompanyProfile + company_id + "/seekerID=" + seekerID + "/pageLength=" + pageLength)
      .then(function (response) {
        try {
          company = response.data;
          jobList = company.companyAdvertisements.firstPageAdvertisements;

          for (let i = 0; i < jobList.length; i++) {
            var postDate = new Date(jobList[i].posted_date);
            jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
          }

          company.companyAdvertisements.firstPageAdvertisements = jobList;
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

  async getAllAdvertisementsByCompanyID(emp_id: string, filterby: string) {
    let jobList: any = [];

    await axios.get(Apipaths.GetCompanyAdvertisementList + emp_id + "/filterby=" + filterby)
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

  async getAllAdvertisementsByCompanyIDAndSearch(emp_id: string, filterby: string, title: string){
    let jobList: any = [];

    await axios.get(Apipaths.GetCompanyAdvertisementList + emp_id + "/filterby=" + filterby + "/title=" + title)
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

  async activateAdvertisementAndChangeDeadline(jobID: string, deadline: string) {
    let response: any = null;

    await axios.patch(Apipaths.changeStatusOfJob + jobID + "/reactivate/newSubmissionDeadline=" + deadline)
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

  async activateAdvertisement(jobID: string) {
    return this.changeStatus(jobID, "active");
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

    await axios.patch(Apipaths.changeStatusOfJob + jobID + "/status=" + status)
      .then(function (res) {
        response = res;
      })
      .catch(
        (error) => {
          if (error.response.status == 400) {
            this.snackBar.open("Expired Date must be future date!. Need to update it before active the advertisement!", "",{panelClass: ['app-notification-warning']})._dismissAfter(5000);
            response = "Invalid Deadline";
          }
          else {
            this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
          }
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
          if (error.response.status == 406) {
            this.snackBar.open("Advertisement cannot be deleted because it has been applied by some applicants!", "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
          }
          else{
            this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
          }
        }
      );

    return response;
  }

  async deleteAdvertisementWithConfirm(jobID: string) {
    let response: any = null;

    await axios.delete(Apipaths.deleteJob + 'confirm=true/' + jobID)
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

    await axios.patch(Apipaths.saveJob + jobID + "/save=" + isSave + "/seekerId=" + seekerID)
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

  async getAppliedAdvertisements(seekerID: string) {
    let jobList: any = [];

    await axios.get(Apipaths.getAppliedAdvertisements + seekerID)
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

  async getAssignedAdvertisementsByHRA(hraID: string){
    let jobList: any = [];

    await axios.get(Apipaths.getAdvertisementsByHRA + hraID)
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

  async getRecommendedAdvertisements(seekerID: string, longitude: string, latitude: string, pageLength: number){
    let jobList: any = [];

    await axios.get(Apipaths.getRecommendedAdvertisements + seekerID + '/len=' + pageLength + '/long=' + longitude + '/lat=' + latitude)
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

  async getRecommendedAdvertisementsWithoutLocation(seekerID: string, pageLength: number){
    let jobList: any = [];

    await axios.get(Apipaths.getRecommendedAdvertisements + seekerID + '/pageLength=' + pageLength)
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
}
