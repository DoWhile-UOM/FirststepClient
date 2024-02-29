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

  // GetSeeker(): Observable<any> {
  //   return new Observable<any>((observer) => {
  //     axios.get('https://localhost:7213/api/Seeker/GetSeeker')
  //       .then(response => {
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch(error => {
  //         observer.error(error);
  //       });
  //   });
  // }


  async getSeeker(id : number) {
    let seekerData: any;
    try{
      await axios.get('https://localhost:7213/api/Seeker/GetSeeker'+ id)
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
      await axios.put("https://localhost:7213/api/Seeker/UpdateSeeker" + seekerID, seeker)
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
      await axios.delete("https://localhost:7213/api/Seeker/DeleteSeeker"+seekerID)
    }
    catch (error) {
      console.error(error);
    }
  }

  
}




