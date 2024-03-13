import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../../shared/advertisement-header/advertisement-header.component";
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from "../../CompanyPortal/shared/file-upload/file-upload.component";


interface Seeker{
    email: string;
    first_name: string;
    last_name: string;
    phone_number:string;
  }

@Component({
    selector: 'app-seeker-application-form',
    standalone: true,
    templateUrl: './seeker-application-form.component.html',
    styleUrl: './seeker-application-form.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent, MatButtonModule, FileUploadComponent]
})
export class SeekerApplicationFormComponent {
   
    SeekerDetails: Seeker = {} as Seeker;
    
  
}
