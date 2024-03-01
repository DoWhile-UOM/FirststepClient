import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component'; 

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

interface Company{
  company_name: string;
  company_description: string;
  company_business_scale: string;
  company_phone_number: string;
  company_email: string;
  company_website: string;
  advertisementUnderCompany: Job[];
}

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    AdvertisementCardComponent, 
    MatCardModule, 
    MatDividerModule, 
    MatGridListModule, 
    MatIconModule, 
    CommonModule,
    NavBarComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  company: Company = {} as Company;
  jobList: Job[] = [];

  seekerID: number = 4; // sample seekerID

  constructor(private advertisementService: AdvertisementServices, private router: ActivatedRoute) { }

  async ngOnInit(){
    //alert(this.company_id);
    let company_id: string = this.router.snapshot.paramMap.get('company_id') ?? '';

    if (company_id == '') {
      alert("Invalid company");
      return;
    }

    this.advertisementService.getCompanyProfile(company_id, String(this.seekerID))
      .then((response) => {
        this.company = response;

        this.jobList = this.company.advertisementUnderCompany;

        if (this.jobList.length == 0) {
          // no advertisements found under the company id
          // something went wrong
          console.log("No advertisements found");
        }
      });

  }

  goBack() {
    window.history.back();
  }
}
