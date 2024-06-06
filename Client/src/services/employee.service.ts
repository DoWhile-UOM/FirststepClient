import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
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
interface User {
  user_id: number;
  password_hash: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private snackBar: MatSnackBar) { }

  async getEmployeeDetails(id: number) {
    let empData: any;
    await axios.get(Apipaths.getEmployeeDetails + id)
      .then((response) => {
        empData = response.data;
      })
      .catch(function (error) {
        alert("Network Error: " + error);
      });;

    return empData;
  }
  async getUserDetails(id: number) {
    let empData: any;
    await axios.get(Apipaths.getUserDetails + id)
      .then((response) => {
        empData = response.data;
      })
      .catch(function (error) {
        alert("Network Error: " + error);
      });;

    return empData;
  }
  async updateEmployeeDetails(employee: Employee) {
    await axios
      .put(Apipaths.editemployee + 7, employee) // tem solution
      .then((response) => {
        console.log('Emlpoyee details updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async updateUserDetails(user: User) {
    await axios
      .put(Apipaths.updateUserDetails, user)
      .then((response) => {
        if (response.status == 200) {
          this.snackBar.open('User details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
        }
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open('Error updating user details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });
  }

  async getEmployeeList(company_id: number) {
    let empData: any;

    await axios.get(Apipaths.getEmployeeList + company_id)
      .then((response) => {
        empData = response.data;
      })
      .catch(function (error) {
        alert("Network Error: " + error);

      });

    return empData;
  }

  async addNewHRManager(employee: any) {
    try {
      employee.company_id = 7; // sample company_id
      await axios.post(Apipaths.addNewHRManager, employee)
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  async addNewHRAssistant(employee: any) {
    try {
      employee.company_id = 7; // sample company_id

      await axios.post(Apipaths.addNewHRAssistant, employee)
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  async editemployee(employee: any, employeeID: number) {
    try {
      await axios.put(Apipaths.editemployee + employeeID, employee)
        .then((response) => {
          console.log(response);
        });

    }
    catch (error) {
      console.error(error);
    }
  }

  async deleteEmployee(employeeID: number) {
    try {
      await axios.delete(Apipaths.deleteEmployee + employeeID)
    }
    catch (error) {
      console.error(error);
    }
  }

  async getAllHRMs(companyID: number) {
    let empData: any;

    await axios.get(Apipaths.getAllHRMs + companyID)
      .then((response) => {
        empData = response.data;
      })
      .catch(function (error) {
        alert("Network Error: " + error);
      });

    return empData;
  }

  async getAllHRAs(companyID: number) {
    let empData: any;

    await axios.get(Apipaths.getAllHRAs + companyID)
      .then((response) => {
        empData = response.data;
      })
      .catch(function (error) {
        alert("Network Error: " + error);
      });

    return empData;
  }
}