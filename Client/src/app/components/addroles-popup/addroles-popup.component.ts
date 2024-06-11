import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { I } from '@angular/cdk/keycodes';

interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  company_id: number;
}

@Component({
  selector: 'app-addroles-popup',
  standalone: true,
  templateUrl: './addroles-popup.component.html',
  styleUrl: './addroles-popup.component.css',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    FileUploadComponent,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class AddrolesPopupComponent {
  hide = true;
  employee: Employee = {} as Employee;
  selectedRole: string = 'HRM';
  constructor(
    public dialogRef: MatDialogRef<AddrolesPopupComponent>,
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //assign data from manage roles component
    this.employee.company_id = data.company_id;
  }

  
  async onSubmit() {
   if (
      !this.employee.first_name ||
      !this.employee.last_name ||
      !this.employee.email ||
      !this.employee.password
    ) {
        this._snackBar.open("Please fill all the Fields", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return false;  
      }
    
    else{
     if (this.selectedRole === 'HRA') {
        await this.employeeService.addNewHRAssistant(this.employee);
      } else {
        await this.employeeService.addNewHRManager(this.employee);
      }

      this._snackBar.open('Role added successfully', '', {
        duration: 3000,
      });
      return true;
     
      }
    }
}

