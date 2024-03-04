import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Apipaths } from '../app/apipaths/apipaths';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})


export class SeekerService {

  constructor() { }

  async getSeeker(id : number) {
    let seekerData: any;
    try{
      await axios.get('Seeker/GetSeeker/'+ id)
        .then((response) => {
          seekerData = response.data;
        });
    }
    catch (error) {
      console.error(error);
    }

    return seekerData;
  }

  async editseeker(seeker: any, seekerID: number) {
    try{      
      await axios.put("Seeker/UpdateSeeker/" + seekerID, seeker)
        .then((response) => {
          console.log(response);
        });
      
    }
    catch (error) {
      console.error(error);
    }
  }

  async deleteseeker(seekerID:number){
    try{
      await axios.delete("Seeker/DeleteSeeker/"+seekerID)
    }
    catch (error) {
      console.error(error);
    }
  }

  async addseeker(seeker: any){
    try{
      await axios.post("Seeker/AddSeeker", seeker)
    }
    catch (error) {
      console.error(error);
    }
  }

  
}




