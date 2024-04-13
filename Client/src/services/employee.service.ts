import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { response } from 'express';

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
//all employee details
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