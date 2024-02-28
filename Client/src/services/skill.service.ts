import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }

  async getAllSkills() {
    let skills: string[] = [];
    await axios.get(Apipaths.getAllSkills)
      .then(function (response) {
        try {
          skills = response.data;
        }
        catch (error) {
          console.log("No skills found");
        }
      });

    return skills;
  }
}
