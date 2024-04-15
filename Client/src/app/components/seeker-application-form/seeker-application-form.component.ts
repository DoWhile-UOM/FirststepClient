import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SeekerService } from '../../../services/seeker.service';


interface Seeker{
    email:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    linkedin:string;
  }

@Component({
    selector: 'app-seeker-application-form',
    standalone: true,
    templateUrl: './seeker-application-form.component.html',
    styleUrl: './seeker-application-form.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent, MatButtonModule, FileUploadComponent,MatCheckboxModule]
})
export class SeekerApplicationFormComponent {
    SeekerDetails: Seeker = {} as Seeker;
    constructor(private seekerService:SeekerService) {}
    user_id: number = 2;
    
    async ngOnInit() {
      this.fetchEmployeeDetails(); 
    }
    
    async fetchEmployeeDetails() {
      this.seekerService = await this.seekerService.getSeekerDetails(this.user_id);
    }

};


   
   

    
  

