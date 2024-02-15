import { Injectable } from '@angular/core';
import { Apipaths } from '../app/apipaths/apipaths';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }


async addNewHRManager(employee: any) {
    try{
    const response =await axios.post('https://localhost:7213/api/Employee/AddNewHRManager',employee) 
    console.log(response.data);
    return response.data;
    }
    catch (error) {
      console.error(error);
      throw error; 
    }
  
  
}
}