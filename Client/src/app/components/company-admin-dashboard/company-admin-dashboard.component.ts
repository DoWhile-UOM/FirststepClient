import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { LineGraphComponent } from '../line-graph/line-graph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DoughnutGraphStatusComponent } from '../doughnut-graph-status/doughnut-graph-status.component';
import { MatMenuModule } from '@angular/material/menu';
import { CaEmployeeStatComponent } from '../ca-employee-stat/ca-employee-stat.component';
import { CaAverageTimeComponent } from '../ca-average-time/ca-average-time.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { ApplicationService } from '../../../services/application.service';
import { Router } from '@angular/router';
import { AddrolesPopupComponent } from '../addroles-popup/addroles-popup.component';
import { MatDialog } from '@angular/material/dialog';

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
  styleUrl: './company-admin-dashboard.component.css',
  imports: [
    MatCardModule,
    MatCard,
    LineGraphComponent,
    MatButtonModule,
    MatIconModule,
    DoughnutGraphStatusComponent,
    CommonModule,
    MatMenuModule,
    CaEmployeeStatComponent,
    CaAverageTimeComponent,
  ],
})
export class CompanyAdminDashboardComponent implements OnInit {
  public userName: string = '';
  jobData: Job[] = [];
  companyID: string = '';
  applicationData: ApplicationData[] = [];

  constructor(
    public advertisementServices: AdvertisementServices,
    public applicationService: ApplicationService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    try {
      this.userName = this.authService.getName();
      this.companyID = this.authService.getCompanyID();
      this.fetchJobData();
    } catch (e) {
    }
  }

  async fetchJobData(): Promise<void> {
    const jobData: Advertisement[] =
      await this.advertisementServices.getCompanyAdvertisementTitleList(
        this.companyID
      );
    this.jobData = jobData.map((ad: Advertisement) => ({
      job_id: ad.advertisement_id,
      job_title: ad.advertisement_title,
    }));

    if (this.jobData.length > 0) {
      this.advertismentSelect(this.jobData[0].job_id);
    }
  }

  async advertismentSelect(advertismentID: number): Promise<void> {
    try {
      const data = await this.applicationService.getApplicationCount(
        advertismentID
      );
      this.applicationData = data;
    } catch (e) {
    }
  }

  createJobAd() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    this.router.navigate(['ca/jobOfferList/newJob']);
  }

  createRoleAccount() {
    this.dialog.open(AddrolesPopupComponent, {
      data: {
        company_id: this.companyID,
      },
    });
  }
}
