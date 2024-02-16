import { Component } from '@angular/core';
import { AdvertisementHeaderComponent } from '../../shared/advertisement-header/advertisement-header.component';
import { AdvertisementViewComponent } from '../../shared/advertisement-view/advertisement-view.component';
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { CaNavBarComponent } from '../../CompanyPortal/CompanyAdmin/ca-nav-bar/ca-nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementServices } from '../../../services/advertisement.service';

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
  job_overview: string;
  job_responsibilities: string;
  job_qualifications: string;
  job_benefits: string;
  job_other_details: string;
  field_name: string;
  company_name: string;
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
