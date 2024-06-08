import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class JobfieldService {

  constructor(private snackBar: MatSnackBar) { }

  async getAll(){
    let fieldList: any = [];

    await axios.get(Apipaths.getAllFields)
      .then(function (response) {
        fieldList = response.data;
      })
      .catch(
        (error) => {
          this.snackBar.open(error.message, "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
        }
      );

    return fieldList;
  }

  //For seeker profile edit
  async getFieldNameById(fieldId: number): Promise<string> {
    const fields = await this.getAll();
    const field = fields.find((f: any) => f.field_id === fieldId);
    return field ? field.field_name : 'Unknown';
  }
}
