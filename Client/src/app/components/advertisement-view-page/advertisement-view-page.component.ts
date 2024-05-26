import { Component, Inject } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { countries } from 'country-data';
import { Country } from 'country-state-city';
import { MatBadgeModule } from '@angular/material/badge';

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
  is_expired: boolean;
  skills: Skill[];
}

@Component({
  selector: 'app-advertisement-view-page',
  standalone: true,
  imports: [AdvertisementHeaderComponent, MatCardModule, CommonModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, MatBadgeModule],
  templateUrl: './advertisement-view-page.component.html',
  styleUrl: './advertisement-view-page.component.css'
})
export class AdvertisementViewPageComponent {
  adData: Job = {} as Job;
  isNullDeadline: boolean = false;

  constructor(
    private router: ActivatedRoute, 
    private adService: AdvertisementServices,
    public dialogRef: MatDialogRef<AdvertisementViewPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
}
