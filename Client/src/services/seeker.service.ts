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

}