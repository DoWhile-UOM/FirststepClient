import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';


import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { EmployeeService } from '../../../../services/employee.service';


interface Employee {
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
}

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FileUploadComponent,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    FileUploadComponent,
    FormsModule,
    MatDialogModule,
    MatDialogClose,
  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent implements OnInit {

  employeeDetails: Employee = {} as Employee;
 

  constructor(private employeeService: EmployeeService,@Inject(MAT_DIALOG_DATA)public data:any) {}
  user_id: number = this.data.id;
  
  async ngOnInit() {
    this.fetchEmployeeDetails();
    console.log(this.data);
  }
  
  async fetchEmployeeDetails() {
    this.employeeDetails = await this.employeeService.getEmployeeDetails(this.user_id);
  }


  async onApply() {
   await this.employeeService.editemployee(this.employeeDetails, this.user_id);
  }
 
}
