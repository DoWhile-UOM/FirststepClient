import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    CommonModule],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  company: Company = {} as Company;
  jobList: Job[] = [];

  seekerID: number = 0;

  constructor(
    private advertisementService: AdvertisementServices, 
    private a_router: ActivatedRoute, 
    private router: Router, 
    private snackBar: MatSnackBar) { 

  }

  async ngOnInit(){
    try {
      var seekerID = String(sessionStorage.getItem('user_id'));
      var user_type = String(sessionStorage.getItem('user_type'));

      if (this.seekerID == null && user_type != 'seeker'){
        this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
        // navigate to 404 page
        this.router.navigate(['/notfound']);
        // code to signout
        return;
      }

      this.seekerID = Number(seekerID);
    } catch (error) {
      this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
      // navigate to 404 page
      this.router.navigate(['/notfound']);
      // code to signout
      return;
    }

    let company_id: string = this.a_router.snapshot.paramMap.get('company_id') ?? '';

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
