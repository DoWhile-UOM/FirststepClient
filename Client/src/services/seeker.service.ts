import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  async getSeekerDetails(id : number) {
    let seekerData: any;
    
    await axios.get(Apipaths.getSeekerDetails  + id)
      .then((response) => {
        seekerData = response.data;
      })
      .catch (function (error) {
        alert("Network Error: " + error);
      });;

    return seekerData;
  }

  async getSeekerDetailsForApplication(id : number) {
    let seekerData: any;
    
    await axios.get(Apipaths.getSeekerDetailsForApplication  + id)
      .then((response) => {
        seekerData = response.data;
      })
      .catch (function (error) {
        alert("Network Error: " + error);
      });;

    return seekerData;
  }

  //update method
  async editseeker(seeker: any, seekerID: number) {
    try {
      await axios
        .put('https://localhost:7213/api/Seeker/UpdateSeeker/' + seekerID, seeker)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  //delete method
  async deleteseeker(seekerID: number) {
    try {
      await axios.delete('https://localhost:7213/api/Seeker/DeleteSeeker/1059' + seekerID);
    } catch (error) {
      console.error(error);
    }
  }

  //add method
  async addseeker(seeker: any) {
    try {
      seeker.seeker_id= 13; //sample company id
      await axios.post('https://localhost:7213/api/Seeker/AddSeeker', seeker)
      .then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
