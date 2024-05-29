import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SeekerService {
  
constructor(private http: HttpClient) { }

async getSeekerDetails(id : number) {
  let seekerData: any;
  
  await axios.get('https://localhost:7213/api/Seeker/GetSeeker/' + id)
    .then((response) => {
      seekerData = response.data;
    })
    .catch (function (error) {
      console.log("Network Error: " + error);
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
      console.log("Network Error: " + error);
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
      });console.log("seeker updated successfully");
  } catch (error) {
    console.error(error);
  }
}

//delete method
async deleteseeker(seekerID: number) {
  try {
    await axios.delete('https://localhost:7213/api/Seeker/DeleteSeeker/' + seekerID);
    console.log("seeker deleted successfully");
  } catch (error) {
    ///console.error(error);
  }
}

//register method
SeekerRegister(seeker:any){
  return this.http.post<any>('https://localhost:7213/api/Seeker/AddSeeker',seeker)
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