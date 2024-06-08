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
  //update employee in edit role
  async updateEmployeeDetails(employee: Employee) {
    try{
      await axios.put(Apipaths.editemployee + employee.user_id, employee)
        .then((response) => {
          console.log('Emlpoyee details updated successfully');
        });
    }
    catch (error) {
      console.error(error);
    }
  }
 
  async getEmployeeList(company_id: string) {
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
    try{
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
    try{
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

  async getAllHRMs(companyID: string){
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

  async getAllHRAs(companyID: string){
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