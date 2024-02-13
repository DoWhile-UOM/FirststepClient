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
}
