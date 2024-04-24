import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from '../app/apipaths/apipaths';


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
