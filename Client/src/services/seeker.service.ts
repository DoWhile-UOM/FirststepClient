import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  
  constructor() {}

  //getting all details of an employee
  async getSeekerDetails(id: number) {
    let seekerData: any;
    try {
      await axios.get('Seeker/GetSeeker/' + id)
      .then((response) => {
        seekerData = response.data;
        //console.log(seekerData);
      });
    } catch (error) {
      //console.error(error);
    }

    //alert(seekerData);

    return seekerData;
  }

  //update method
  async editseeker(seeker: any, seekerID: number) {
    try {
      await axios
        .put('Seeker/UpdateSeeker/' + seekerID, seeker)
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
      await axios.delete('Seeker/DeleteSeeker/1059' + seekerID);
    } catch (error) {
      console.error(error);
    }
  }

  //add method
  async addseeker(seeker: any) {
    try {
      seeker.seeker_id= 13; //sample company id
      await axios.post('Seeker/AddSeeker', seeker)
       .then((response) => {
         console.log(response);
       });
    } catch (error) {
      console.error(error);
    }
  }
}
