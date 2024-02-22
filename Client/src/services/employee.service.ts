import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  async getEmployeeDetails(id : number) {
    let empData: any;
    try{
      await axios.get('https://localhost:7213/api/Employee/GetEmployeeById/' + id)
        .then((response) => {
          empData = response.data;
        });
    }
    catch (error) {
      console.error(error);
    }

    return empData;
  }

  constructor() { }


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

  async editNewHRManager(employee: any, employeeID: number) {
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
}