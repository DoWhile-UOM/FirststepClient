import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementActionsComponent } from '../advertisement-actions/advertisement-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface Job {
  advertisement_id: number;
  title: string;
  company_name: string;
  company_id: number;
  field_name: string;
  country: string;
  city: string;
  employeement_type: string;
  arrangement: string;
  posted_date: string;
  is_saved: boolean;
}

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [ MatCardModule, AdvertisementActionsComponent, MatButtonModule ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css'
})
export class AdvertisementCardComponent implements OnInit{
  @Input() job!: Job;
  icon: string = 'bookmark_border'; 

  constructor(private router: Router) { 
  }

  ngOnInit() : void{ 
  }

  onClickMoreDetails() {
    this.router.navigate(['seeker/jobdetails', {jobID: this.job.advertisement_id}]);
  }

  onClickCompanyName() {
    this.router.navigate(['seeker/company-profile', {company_id: this.job.company_id}]);
  }
}