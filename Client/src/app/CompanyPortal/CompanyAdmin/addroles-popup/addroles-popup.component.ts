import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { EmployeeService } from '../../../../services/employee.service';
import { SuccessPopupComponent } from '../../shared/success-popup/success-popup.component';

interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSnackBarModule,
    
  ],
})
export class AddrolesPopupComponent {
  employee: Employee = {} as Employee;
  selectedRole: string = 'HRM';
  constructor(private employeeService: EmployeeService, private _snackBar: MatSnackBar) {}

  async onSubmit() {
    if (this.selectedRole === 'HRA') {
      await this.employeeService.addNewHRAssistant(this.employee);
    } else {
      await this.employeeService.addNewHRManager(this.employee);
    }
  }
  durationInSeconds = 2;
 
  openSnackBar() {
    this._snackBar.openFromComponent(SuccessPopupComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


 
}
