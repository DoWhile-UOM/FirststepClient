import { Component } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { AdvertisementViewComponent } from '../advertisement-view/advertisement-view.component';
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CaNavBarComponent } from '../ca-nav-bar/ca-nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementServices } from '../../../services/advertisement.service';

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
  imports: [AdvertisementHeaderComponent, AdvertisementViewComponent, NavBarComponent, MatCardModule, CaNavBarComponent],
  templateUrl: './advertisement-view-page.component.html',
  styleUrl: './advertisement-view-page.component.css'
})
export class AdvertisementViewPageComponent {
  adData: Job = {} as Job;

  constructor(private router: ActivatedRoute, private adService: AdvertisementServices) {
    
  }
  
  async ngOnInit() {
    let jobID: string | null = this.router.snapshot.paramMap.get('jobID');

    if (jobID == null) {
      console.log("No job ID found");
      return;
    }

    this.adData = await this.adService.getAdvertisementById(jobID);
  }
}
