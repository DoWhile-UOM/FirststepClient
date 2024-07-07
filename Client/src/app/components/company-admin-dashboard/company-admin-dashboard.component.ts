import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { LineGraphComponent } from '../line-graph/line-graph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DoughnutGraphStatusComponent } from '../doughnut-graph-status/doughnut-graph-status.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { ApplicationService } from '../../../services/application.service';

interface Job {
  job_id: number;
  job_title: string;
}

interface Advertisement {
  advertisement_id: number;
  advertisement_title: string;
}

interface ApplicationData {
  date: string;
  count: number;

}

@Component({
  selector: 'app-company-admin-dashboard',
  standalone: true,
  templateUrl: './company-admin-dashboard.component.html',
  styleUrls: ['./company-admin-dashboard.component.css'],
  imports: [
    MatCardModule,
    MatCard,
    LineGraphComponent,
    MatButtonModule,
    MatIconModule,
    DoughnutGraphStatusComponent,
    MatMenuModule,
    CommonModule,
  ],
})
export class CompanyAdminDashboardComponent implements OnInit {

  jobData: Job[] = [];
  companyID: string = '7';
  applicationData: ApplicationData[] = [];

  constructor(public advertisementServices: AdvertisementServices,public applicationService:ApplicationService) {}

  ngOnInit(): void {
    try {
      this.fetchJobData();
    } catch (e) {
      console.log(e);
    }
  }

  async fetchJobData(): Promise<void> {
    const jobData: Advertisement[] = await this.advertisementServices.getCompanyAdvertisementTitleList(this.companyID);
    this.jobData = jobData.map((ad: Advertisement) => ({
      job_id: ad.advertisement_id,
      job_title: ad.advertisement_title,
    }));
  }

  async advertismentSelect(advertismentID: number): Promise<void>{
    try{
    const data = await this.applicationService.getApplicationCount(advertismentID);
    this.applicationData = data;
    }
    catch(e){
      console.log(e);
    }
}
}
  
  

