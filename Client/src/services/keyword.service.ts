import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  constructor() { }

  async getAllKeywords(field_id: number) {
    let keywords: any = [];

    // get all keywords for the selected field
    await axios.get(Apipaths.getKeywords + field_id)
      .then(function (response) {
        try {
          keywords = response.data;
        }
        catch (error) {
          console.log("No keywords found");
        }
      })
      .catch(
        function (error) {
          alert('Network Error: ' + error);
        }
      );

    return keywords;
  }
}
