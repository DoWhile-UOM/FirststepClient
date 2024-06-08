import { Component, Inject, OnInit } from '@angular/core';
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
import { NgIf } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { DialogData } from '../company-application/company-application.component';


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
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent,MatStepperModule,MatInputModule,FormsModule, ReactiveFormsModule,MatButtonModule,NgIf, MatDialogModule]
})
export class SeekerApplicationStatusComponent implements OnInit{

  applicationData: Application = {} as Application;
  
  jobData: Job = {} as Job;
  

 
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
//sample application id
application_id: number = 1014;
  constructor(private _formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private documentService:DocumentService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      // assign data from application card 
      this.jobData.title = data.job_title;
      this.jobData.field_name = data.field_name;
      this.jobData.company_name = data.company_name;
    }
  


async ngOnInit() {
 this.getApplicationStatus();
}


getApplicationStatus(): void{
  this.applicationService.getApplicationStatus(this.application_id).then(
    (data: Application) => {
      this.applicationData = data;
      console.log('Application Status:', this.applicationData);
      this.getDocumentUrl();
    },
    error => {
      console.error('Error fetching application status:', error);
    }
  );
}

//get document url
async getDocumentUrl(){
 this.documentService.generateSasToken(this.applicationData.cv_name).subscribe(
    (token:string) => {
      this.document= this.documentService.getBlobUrl(this.applicationData.cv_name, token);
      console.log('Document URL:', this.document); 
      
    },
    error => {
      console.error('Error fetching SAS token:', error);
    }
  );

}

//Only the steps up to and including the current status are marked as completed, except if the current status is 'Rejected'
isCompleted(stepName: string): boolean {
  const statusOrder = ['Submitted', 'Screening', 'Finalized', 'Rejected'];
  const currentStatusIndex = statusOrder.indexOf(this.applicationData.status);
  const stepIndex = statusOrder.indexOf(stepName);
  return stepIndex < currentStatusIndex || (stepIndex === currentStatusIndex  && this.applicationData.status !== 'Rejected');
 
}
}