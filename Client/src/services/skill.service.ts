import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private snackBar: MatSnackBar) { }

  async getAllSkills() {
    let skills: string[] = [];
    await axios.get(Apipaths.getAllSkills)
      .then(function (response) {
        skills = response.data;
      }).catch(
        (error) => {
         this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
       }
     );

    return skills;
  }
}
