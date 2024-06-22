import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private snackBar: MatSnackBar) { }

  async getLogging() {
    let loggings: any = {};
    try {
      await axios.get(Apipaths.getLoggingsDetails)
        .then(function (response) {
          try {
            loggings = response.data;
          }
          catch (error) {
            console.log('No loggings found');
          }
        })
        .catch((error) => {
          const errorMessage = error.message || 'Unknown error occurred';
          this.snackBar.open(`Error occurred: ${errorMessage}`, "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
        });
      return loggings;
    } catch (error) {
      this.snackBar.open(`Error occurred: ${error}`, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }
}
