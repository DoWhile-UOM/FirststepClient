import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
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
        fieldList = response.data;
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return fieldList;
  }
}
