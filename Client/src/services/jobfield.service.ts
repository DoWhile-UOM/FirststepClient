import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class JobfieldService {

  constructor() { }

  async getAll(){
    let fieldList: any = [];

    await axios.get(Apipaths.getAllFields)
      .then(function (response) {
        try {
          fieldList = response.data;
        }
        catch (error) {
          console.log("No fields found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return fieldList;
  }
}
