import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SeekerService {
  constructor() {}

  //getting all details of an employee
  async getSeekerDetails(id: number) {
    let seekerData: any;
    try {
      await axios.get('https://localhost:7213/api/Seeker/GetSeeker/' + id)
      .then((response) => {
        seekerData = response.data;
        //console.log(seekerData);
      });
    } catch (error) {
      //console.error(error);
    }

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
      await axios.delete('https://localhost:7213/api/Seeker/DeleteSeeker/' + seekerID);
    } catch (error) {
      ///console.error(error);
    }
  }

  //add method
  async addseeker(seeker: any) {
    try {
      await axios.post('https://localhost:7213/api/Seeker/AddSeeker', seeker)
       .then((response) => {
         console.log(response);
       });
    } catch (error) {
      console.error(error);
    }
  }
}
