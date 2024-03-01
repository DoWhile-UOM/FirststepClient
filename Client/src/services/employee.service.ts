import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';

interface Employee {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  company_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private snackBar: MatSnackBar) {}

  async getEmployeeDetails(employeeId: number) {
    let employeeDetails: any = {};

    await axios
      .get(Apipaths.getEmployeeDetails + employeeId)
      .then(function (response) {
        try {
          employeeDetails = response.data;
        } catch (error) {
          console.log('No employee details found for the given id');
        }
      })
      .catch((error) => {
        this.snackBar.open('Network error occurred. Try Again', 'Close', {
          duration: 3000,
        });
      });

    console.log(employeeDetails);
    return employeeDetails;
  }
  async updateEmployeeDetails(employee: Employee) {
    await axios
      .put(Apipaths.updateEmployeeDetails + 7, employee) // tem solution
      .then((response) => {
        console.log('Emlpoyee details updated successfully');
        this.snackBar.open('Employee details updated successfully', 'Close', {
          duration: 3000,
        });
      })
      .catch((error) => {
        this.snackBar.open('Network error occurred. Try Again', 'Close', {
          duration: 3000,
        });
      });
  }
}
