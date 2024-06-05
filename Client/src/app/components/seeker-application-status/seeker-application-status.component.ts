import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationService } from '../../../services/application.service';
import { url } from 'node:inspector';
import { DocumentService } from '../../../services/document.service';

//interface application status

interface Application{
  status: string;
  cv_name: string;
  submitted_date: Date;
}

interface Job {
  title: string;
  field_name: string;
  company_name: string;
}

@Component({
    selector: 'app-seeker-application-status',
    standalone: true,
    templateUrl: './seeker-application-status.component.html',
    styleUrl: './seeker-application-status.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent,MatStepperModule,MatInputModule,FormsModule, ReactiveFormsModule,MatButtonModule]
})
export class SeekerApplicationStatusComponent {
  applicationData: Application = {} as Application;
  //sample application id=8
  application_id: number = 1015;
  jobData: Job = {
    title: 'Software Developer',
    field_name: 'Software Development',
    company_name: 'Google',
  }

 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

document: any ;
documentName: string = 'KARATE.pdf';
  constructor(private _formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private documentService:DocumentService ) {}


async ngOnInit() {
 this.getDocumentUrl(); 
}

//get document url
async getDocumentUrl(){
 this.documentService.generateSasToken(this.documentName).subscribe(
    (token:string) => {
      this.document= this.documentService.getBlobUrl(this.documentName, token);
      console.log('Document URL:', this.document); 
      
    },
    error => {
      console.error('Error fetching SAS token:', error);
    }
  );

}
}