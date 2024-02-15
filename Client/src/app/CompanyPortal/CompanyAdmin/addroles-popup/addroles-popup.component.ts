import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from "../../shared/file-upload/file-upload.component";
import { FormsModule } from '@angular/forms';


import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import { EmployeeService } from '../../../../services/employee.service';



@Component({
    selector: 'app-addroles-popup',
    standalone: true, 
    templateUrl:'./addroles-popup.component.html',
    styleUrl: './addroles-popup.component.css',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule, FileUploadComponent, FormsModule,MatDialogModule,MatDialogContent,MatDialogActions,MatDialogClose]
})
export class AddrolesPopupComponent {
    
  employee: any = {};

  constructor(private employeeService:EmployeeService){}

  async onSubmit() {
    try {
        const response = await this.employeeService.addNewHRManager(this.employee);
        console.log('HR manager added successfully:', response);
         // Optionally, reset the form or do other actions upon successful submission
    } catch (error) {
        console.error('Error adding HR manager:', error);
    }
  }


           /*  [x: string]: any;
    emp_role: string = "Non";

    constructor(private http: HttpClient) { 

    }
 
    onRoleCreate(employee: Employee){
        employee.company_id = 8; // sample company_id
        console.log(employee);
        this.http.post('https://localhost:7213/api/Employee/AddNewHRManager', employee).subscribe((res:any) => {});

        /*
        if (this.emp_role == "HRM") {
            this.http.post(Apipaths.addNewHRManager, employee).subscribe({
                next: data => {
                    alert('HR Manager added successfully')
                },
                error: error => {
                    console.error('Error occured', error);
                }
            });
        }
        else if (this.emp_role == "HRA") {
            this.http.post(Apipaths.addNewHRAssistant, employee).subscribe({
                next: data => {
                    alert('HR Assistant added successfully')
                },
                error: error => {
                    console.error('Error occured', error);
                }
            });
        }
        else {
            this['dialog'].open("Invalid role", "OK");

            throw new Error("Invalid role");
        }*/
    }



