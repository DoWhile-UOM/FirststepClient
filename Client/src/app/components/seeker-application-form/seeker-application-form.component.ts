import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SeekerService } from '../../../services/seeker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileDownloadComponent } from "../file-download/file-download.component";
import { Router } from '@angular/router';


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
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent, MatButtonModule, FileUploadComponent, MatCheckboxModule, FormsModule, CommonModule, FileDownloadComponent]
})
export class SeekerApplicationFormComponent {
    SeekerDetails: Seeker = {} as Seeker;
    useDefaultCV: boolean = false; 
    constructor(private seekerService:SeekerService, private router: Router) {}
    user_id: number = 2;
    
    async ngOnInit() {
      this.fetchEmployeeDetails(); 
    }
    
    async fetchEmployeeDetails() {

      try {
        const seekerData = await this.seekerService.getSeekerDetailsForApplication(this.user_id);
        this.SeekerDetails = seekerData;
      } catch (error) {
        console.error('Error fetching seeker details:', error);
       
      }
   

}

onSubmitForm(){
  this.router.navigate(['seeker/home/applicationForm/applicationFormconfirm']);
}
}


   
   

    
  

