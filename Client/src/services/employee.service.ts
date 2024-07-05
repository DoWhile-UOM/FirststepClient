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
interface CmpAdminReg {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
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
      .catch((error) => {
        this.snackBar.open('Error fetching user details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });;

    return empData;
  }

  async updateEmployeeDetails(employee: Employee) {
    await axios
      .put(Apipaths.editemployee + 7, employee) // tem solution
      .then((response) => {
        this.snackBar.open('Employee details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      })
      .catch((error) => {
        this.snackBar.open('Error updating employee details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
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
        this.snackBar.open('Error updating user details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      });
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
    try {
      await axios.post(Apipaths.addNewHRManager, employee)
        .then((response) => {
          console.log(response);
          this.snackBar.open('HR Manager added successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);

        });
    }
    catch (error) {
      console.error(error);
      this.snackBar.open('Error adding HR Manager', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async addNewHRAssistant(employee: any) {
    try {
      await axios.post(Apipaths.addNewHRAssistant, employee)
        .then((response) => {
          console.log(response);
          this.snackBar.open('Talent Acquisition Specialist added successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
        });
    }
    catch (error) {
      console.error(error);
      this.snackBar.open('Error adding Talent Acquisition Specialist', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async editemployee(employee: any, employeeID: number) {
    try {
      await axios.put(Apipaths.editemployee + employeeID, employee)
        .then((response) => {
          console.log(response);
          this.snackBar.open('Employee details updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
        });

    }
    catch (error) {
      console.error(error);
      this.snackBar.open('Error updating employee details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async deleteEmployee(employeeID: number) {
    try {
      await axios.delete(Apipaths.deleteEmployee + employeeID)
        .then((response) => {
          console.log(response);
          this.snackBar.open('Employee deleted successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  async getAllHRMs(companyID: string) {
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

  async getAllHRAs(companyID: string) {
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
  async postCompanyAdminReg(adminRegData: CmpAdminReg) {
    try {
      const response = await axios.post(Apipaths.postCompanyAdminReg, adminRegData);
      if (response.status === 200) {
        this.snackBar.open('Company Admin registered successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      } else {
        this.snackBar.open('Error registering company admin', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      }
    } catch (error) {
      console.error(error);
      this.snackBar.open('Error registering company admin', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async getEmployeeStats(companyId: number): Promise<any> {
    try {
      const response = await axios.get(`${Apipaths.getEmployeeStat}/${companyId}`);
      return response.data;
    } catch (error) {
      this.snackBar.open('Failed to load employee stats', 'Close', {
        duration: 3000,
      });
      console.error("Network Error: " + error);
      throw error;
    }
  }
}