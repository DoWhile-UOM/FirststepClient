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

interface Employee {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  company_id: number;
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
    NgxSpinnerModule, CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions
  ],
})
export class RoleProfileEditComponent {
  hide = true;
  employee: Employee = {} as Employee;

  constructor(
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<RoleProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  async ngOnInit() {
    try {
      this.spinner.show();
      this.employee = await this.employeeService.getEmployeeDetails(10);
    } finally {
      this.spinner.hide();
    }
  }
  async updateChanges() {
    try {
      this.spinner.show();
      await this.employeeService.updateEmployeeDetails(this.employee);
    } finally {
      this.spinner.hide();
    }
  }

  async close() {
    this.dialogRef.close();
  }
}
