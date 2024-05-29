import { Component, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeekerService } from '../../../services/seeker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileDownloadComponent } from '../file-download/file-download.component';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SeekerApplicationFileUploadComponent } from '../seeker-application-file-upload/seeker-application-file-upload.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

interface Seeker {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  linkedin: string;
}

interface Application {
  user_id: number;
  advertisement_id: number;
  seeker_id: number;
  cv?: File;
  UseDefaultCv: boolean;
  doc1_url?: string;
  doc2_url?: string;
}

interface Job {
  title: string;
  field_name: string;
  company_name: string;
}

@Component({
  selector: 'app-seeker-application-form',
  standalone: true,
  templateUrl: './seeker-application-form.component.html',
  styleUrl: './seeker-application-form.component.css',
  imports: [
    MatCardModule,
    MatDividerModule,
    AdvertisementHeaderComponent,
    MatButtonModule,
    FileUploadComponent,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    FileDownloadComponent,
    MatDialogModule,
    SeekerApplicationFileUploadComponent,
    SpinnerComponent
  ],
})
export class SeekerApplicationFormComponent implements OnInit {
  SeekerDetails: Seeker = {} as Seeker;
  applicationData: Application = {} as Application;
  jobData: Job = {} as Job;
  user_id: number = 0;
  useDefaultCv: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SeekerApplicationFormComponent>,
    private seekerService: SeekerService,
    private applicationService: ApplicationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // assign data from application card
    this.applicationData.advertisement_id = data.jobID;
    this.user_id = data.seekerID;
    this.jobData.company_name = data.company_name;
    this.jobData.title = data.job_title;
    this.jobData.field_name = data.job_field;
  }

  async ngOnInit() {
    await this.fetchEmployeeDetails();
  }

  async fetchEmployeeDetails() {
    this.spinner.show();

    try {
      const seekerData =
        await this.seekerService.getSeekerDetailsForApplication(this.user_id);
      this.SeekerDetails = seekerData;
    } catch (error) {
      console.error('Error fetching seeker details:', error);
    }

    this.spinner.hide();
  }

  onCvSelected(file: File) {
    this.applicationData.cv = file;
    this.useDefaultCv = false;
  }

  async onSubmitForm() {
    this.spinner.show();
    
    this.applicationData.UseDefaultCv = this.useDefaultCv;
    const applicationData = new FormData();
    applicationData.append(
      'advertisement_id',
      this.applicationData.advertisement_id.toString()
    );
    applicationData.append('seeker_id', this.user_id.toString());
    applicationData.append(
      'useDefaultCv',
      this.applicationData.UseDefaultCv.toString()
    );

    if (!this.applicationData.UseDefaultCv && this.applicationData.cv) {
      applicationData.append('cv', this.applicationData.cv);
    }

    try {
      // check sucess message from the application service
      await this.applicationService.submitSeekerApplication(applicationData);
      
      this.router.navigate([
        'seeker/home/applicationForm/applicationFormconfirm',
      ]);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error submiting application with cv: ', error);
    }

    this.spinner.hide();
  }
}
