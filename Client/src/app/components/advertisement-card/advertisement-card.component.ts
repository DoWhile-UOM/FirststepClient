import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementActionsComponent } from '../advertisement-actions/advertisement-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisementViewPageComponent } from '../advertisement-view-page/advertisement-view-page.component';
import { CommonModule } from '@angular/common';

interface Job {
  advertisement_id: number;
  title: string;
  company_name: string;
  company_logo_url: string;
  company_id: number;
  field_name: string;
  country: string;
  city: string;
  employeement_type: string;
  arrangement: string;
  posted_date: string;
  is_saved: boolean;
  is_expired: boolean;
}

interface AppliedJob {
  advertisement_id: number;
  title: string;
  company_name: string;
  company_logo_url: string;
  company_id: number;
  field_name: string;
  country: string;
  city: string;
  employeement_type: string;
  arrangement: string;
  posted_date: string;
  application_id: number;
  application_status: string;
}

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [ MatCardModule, AdvertisementActionsComponent, MatButtonModule, MatIconModule, CommonModule ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css'
})
export class AdvertisementCardComponent{
  @Input() job!: Job;
  @Input() appliedJob!: AppliedJob;
  icon: string = 'bookmark_border'; 
  company_logo_url: string = '../../../assets/Img.png';
  isApplicationPage: boolean = false;

  displayStatus: string = 'Screening';

  constructor(private router: Router, private jobDetailsDialog: MatDialog) { }

  async ngOnInit() {
    if (this.router.url == '/seeker/applied'){
      this.isApplicationPage = true;
      this.company_logo_url = this.appliedJob.company_logo_url;
    }
    else{
      this.company_logo_url = this.job.company_logo_url;
    }
  }

  onClickMoreDetails() {
    let jobId = 0;

    if (this.isApplicationPage) {
      jobId = this.appliedJob.advertisement_id;
    }
    else{
      jobId = this.job.advertisement_id;
    }

    this.jobDetailsDialog.open(AdvertisementViewPageComponent, {
      data: {jobID: jobId},
      maxWidth: '70em'
    });
  }

  onClickCompanyName() {
    let comId = 0;
    if (this.isApplicationPage) {
      comId = this.appliedJob.company_id;
    }
    else{
      comId = this.job.company_id;
    }

    this.router.navigate(['seeker/home/company-profile', {company_id: comId}]);
  }
}
