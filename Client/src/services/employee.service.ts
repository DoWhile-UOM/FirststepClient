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
  
  async getEmployeeList(company_id: number) {
    let empData: any;
    try{
      await axios.get('https://localhost:7213/api/Employee/GetAllEmployees/' + company_id)
        .then((response) => {
          empData = response.data;
        });
    }
    catch (error) {
      //console.error(error);
    }

    return empData;
  }

  async addNewHRManager(employee: any) {
    try{
      employee.company_id = 7; // sample company_id
      
      await axios.post('https://localhost:7213/api/Employee/AddNewHRManager', employee)
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
      employee.company_id = 7; // sample company_id
      
      await axios.post('https://localhost:7213/api/Employee/AddNewHRAssistant', employee)
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  async editemployee(employee: any, employeeID: number) {
    try{      
      await axios.put("https://localhost:7213/api/Employee/UpdateEmployee/" + employeeID, employee)
        .then((response) => {
          console.log(response);
        });
      
    }
    catch (error) {
      console.error(error);
    }
  }

  async deleteEmployee(employeeID:number){
    try{
      await axios.delete("https://localhost:7213/api/Employee/DeleteEmployee/"+employeeID)
    }
    catch (error) {
      console.error(error);
    }
  }
}
