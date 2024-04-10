import { Component, Inject } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

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
	is_experience_required: string;
	salary: string;
	submission_deadline: string;
	posted_date: string;
	job_description: string;
	field_name: string;
	company_name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-advertisement-view-page',
  standalone: true,
  imports: [AdvertisementHeaderComponent, MatCardModule, CommonModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './advertisement-view-page.component.html',
  styleUrl: './advertisement-view-page.component.css'
})
export class AdvertisementViewPageComponent {
  adData: Job = {} as Job;

  constructor(
    private router: ActivatedRoute, 
    private adService: AdvertisementServices,
    public dialogRef: MatDialogRef<AdvertisementViewPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.jobID == null) {
        console.log("No job ID found");
        return;
      }

      console.log("Job ID: " + data.jobID);
  
      (async () => {
        this.adData = await this.adService.getAdvertisementById(data.jobID);
      })();
  } 
}
