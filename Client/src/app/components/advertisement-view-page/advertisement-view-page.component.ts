import { Component, Inject } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { countries } from 'country-data';
import { Country } from 'country-state-city';
import { MatBadgeModule } from '@angular/material/badge';
import { SeekerApplicationFormComponent } from '../seeker-application-form/seeker-application-form.component';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Skill{
  skill_name: string;
  skill_id: number;
}

interface Job{
	job_number: number;
	title: string;
	country: string;
	city: string;
	employeement_type: string;
	arrangement: string;
	experience: string;
	salary: string;
  currency_unit: string;
	submission_deadline: string;
	posted_date: string;
	job_description: string;
	field_name: string;
	company_name: string;
  company_logo_url: string;
  is_expired: boolean;
  skills: Skill[];
}

@Component({
  selector: 'app-advertisement-view-page',
  standalone: true,
  imports: [AdvertisementHeaderComponent, MatCardModule, CommonModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, MatDialogClose, MatBadgeModule, MatIconModule],
  templateUrl: './advertisement-view-page.component.html',
  styleUrl: './advertisement-view-page.component.css'
})
export class AdvertisementViewPageComponent {
  adData: Job = {} as Job;
  isNullDeadline: boolean = false;

  constructor(
    private adService: AdvertisementServices,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdvertisementViewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.jobID == null) {
        console.log("No job ID found");
        return;
      }
  
      (async () => {
        this.adData = await this.adService.getAdvertisementById(data.jobID);

        if (this.adData.submission_deadline == "Jan 1, 1970"){
          this.isNullDeadline = true;
        }

        if (this.adData.currency_unit == null) {
          const countryCode = Country.getAllCountries().find(country => country.name === this.adData.country)?.isoCode;
  
          if (countryCode == undefined){
            //this.snackBar.open("Error: Country not found", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
            this.adData.currency_unit = '';
            return;
          }
  
          this.adData.currency_unit = countries[countryCode].currencies[0];
        }
      })();
  } 

  onClickApplyJob(){
    this.dialogRef.close();
    
    this.dialog.open(SeekerApplicationFormComponent,{
      maxWidth: '100em',
      data: {
        jobID: this.data.jobID, 
        seekerID:  this.auth.getUserId(), 
        company_name:  this.adData.company_name, 
        job_title:  this.adData.title, 
        job_field:  this.adData.field_name,
        company_logo_url:  this.adData.company_logo_url}
    }); 
  }

  onClickCompany(){
    this.router.navigate(['seeker/home/company-profile', {company_id: this.data.comID}]);
    this.dialogRef.close();
  }

  getDescription(){
    return this.adData.job_description.replace(/\n\s*\n/g, '\n');
  }
}
