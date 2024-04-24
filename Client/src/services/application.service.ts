import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from '../app/apipaths/apipaths';
import { AdvertisementServices } from './advertisement.service';
import { SeekerService } from './seeker.service';

interface Application {
  application_Id: number;
  status: string;
  submitted_date: Date;
  advertisement_id: number;
  advertisement: Advertisement; // assuming you have an Advertisement interface
  seeker: Seeker; // assuming you have a Seeker interface
  user_id: number;
}

interface Advertisement {
  advertisement_id: number;
}
interface Seeker {
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  async getAllApplicationsbyAdvertisementID(advertisement_id: number) {
    let applicationList: any = [];

    await axios.get(Apipaths.getAllApplications + advertisement_id)
      .then(function (response) {
        try {
          applicationList = response.data;
        }
        catch (error) {
          console.log("No applications found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return applicationList;
  }


}
