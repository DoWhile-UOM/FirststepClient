import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { EmployeeService } from '../../../services/employee.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
@Component({
  selector: 'app-role-profile-edit',
  standalone: true,
  templateUrl: './role-profile-edit.component.html',
  styleUrl: './role-profile-edit.component.css',
  imports: [
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    SpinnerComponent,
    NgxSpinnerModule, CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, FormsModule, MatProgressSpinnerModule
  ],
})
export class RoleProfileEditComponent {
  hasDataLoaded = false;

  hide = true;
  employee: Employee = {} as Employee;
  user: User = {} as User;
  empId: number = 10;

  errorMessageForEmail: string = '';
  errorMessageForPassword: string = '';
  errorMessageForFirstName: string = '';
  errorMessageForLastName: string = '';

  isFNameVaild: boolean = true;
  isLNameVaild: boolean = true;
  isEmailVaild: boolean = true;
  isPasswordVaild: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<RoleProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  async ngOnInit() {
    this.employee = await this.employeeService.getUserDetails(this.empId);
    if (this.employee) {
      this.hasDataLoaded = true;
      this.employee.password_hash = '';
    }

  }
  async updateChanges() {
    try {
      this.spinner.show();
      this.user.user_id = this.empId;
      this.user.email = this.employee.email;
      this.user.first_name = this.employee.first_name;
      this.user.last_name = this.employee.last_name;
      this.user.password_hash = this.employee.password_hash;

      console.log(this.user.user_id);
      console.log(this.employee.password_hash);

      let response = await this.employeeService.updateUserDetails(this.user);

      console.log('response is' + response);
    }
    catch (error) {
      console.error('Error updating employee details:', error);
    }
    finally {
      this.spinner.hide();
    }
  }
  formValidation() {
    console.log("inside the form validation function");
    console.log(this.isFNameVaild);
    console.log(this.isLNameVaild);
    console.log(this.isEmailVaild);

    if (this.isFNameVaild && this.isLNameVaild && this.isEmailVaild) {
      this.updateChanges();
    }
    else {
      this.snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
        panelClass: ['app-notification-error']
      });
    }
  }
  firstNameValidation() {
    const regex = /^[A-Za-z]+$/;
    if (this.employee.first_name.length == 0 || !regex.test(this.employee.first_name)) {
      this.errorMessageForFirstName = 'First Name is required.';
      this.isFNameVaild = false;
    } else {
      this.errorMessageForFirstName = '';
      this.isFNameVaild = true;
    }
  }
  lastNameValidation() {
    const regex = /^[A-Za-z]+$/;
    if (this.employee.last_name.length == 0 || !regex.test(this.employee.last_name)) {
      this.errorMessageForLastName = 'Last Name is required.';
      this.isLNameVaild = false;
    } else {
      this.errorMessageForLastName = '';
      this.isLNameVaild = true;
    }
  }
  emailValidation() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let testResult = regex.test(this.employee.email.toString());
    if (this.employee.email.length == 0 || testResult == false) {
      this.errorMessageForEmail = 'Valid email is required.';
      this.isEmailVaild = false;
    } else {
      this.errorMessageForEmail = '';
      this.isEmailVaild = true;
    }
  }
  passwordValidation() {

  }
  async close() {
    this.dialogRef.close();
  }
}
