import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class SeekerService {

async getSeekerDetails(id : number) {
  let seekerData: any;
  try{
    await axios.get(Apipaths.getSeekerDetails + id)
      .then((response) => {
        seekerData = response.data;
      });
  }
  catch (error) {
    console.error(error);
  }

  return seekerData;
}

}