import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from "../../shared/file-upload/file-upload.component";
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-addroles-popup',
    standalone: true, 
    templateUrl: './addroles-popup.component.html',
    styleUrl: './addroles-popup.component.css',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, FileUploadComponent, FormsModule, HttpClientModule]
})
export class AddrolesPopupComponent {

    constructor(private http: HttpClient) { 

    }

    onRoleCreate(role: {first_name: string, last_name: string, email: string, password: string, company_id: number}){
        role.company_id = 8;
        console.log(role);

        this.http.post('https://localhost:7213/api/Employee/AddNewHRManager', role)
        .subscribe((res:any) => {
        });
    }
 
}
