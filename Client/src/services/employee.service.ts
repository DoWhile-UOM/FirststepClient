import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  async getEmployeeDetails(id : number) {
    let empData: any;
    
    await axios.get(Apipaths.getEmployeeDetails + id)
      .then((response) => {
        empData = response.data;
      })
      .catch (function (error) {
        alert("Network Error: " + error);
      });;

    return empData;
  }

  //all employee details
  async getEmployeeList(company_id: number) {
    let empData: any;

    await axios.get(Apipaths.getEmployeeList + company_id)
      .then((response) => {
        empData = response.data;
      })
      .catch (function (error) {
        alert("Network Error: " + error);
      });

    return empData;
  }

  async addNewHRManager(employee: any) {
    try{
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
    try{
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
    try{      
      await axios.put( Apipaths.editemployee+ employeeID, employee)
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
      await axios.delete(Apipaths.deleteEmployee+employeeID)
    }
    catch (error) {
      console.error(error);
    }
  }

  async getAllHRMs(companyID: number){
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

  async getAllHRAs(companyID: number){
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