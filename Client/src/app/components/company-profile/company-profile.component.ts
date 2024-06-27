import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';
import { CompanyService } from '../../../services/company.service';

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
  can_apply: boolean;
}

interface Ad_List{
  firstPageAdvertisements: Job[];
  allAdvertisementIds: number[];
}

interface Company{
  company_name: string;
  company_description: string;
  company_business_scale: string;
  company_phone_number: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  companyAdvertisements: Ad_List;
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
    MatPaginatorModule,
    SpinnerComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  company: Company = {} as Company;
  jobList: Job[] = [];
  jobIdList: number[] = [];
  bussinessScale: any = [];

  seekerID: number = 0;
  screenWidth: number = 0;

  constructor(
    private advertisementService: AdvertisementServices, 
    private a_router: ActivatedRoute, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService) { 
      this.bussinessScale = CompanyService.BusinessScales;
      this.getScreenSize()
  }

  paginatorLength = 10;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];

  async ngOnInit(){
    this.spinner.show();

    this.seekerID = Number(this.auth.getUserId());
    let company_id: string = this.a_router.snapshot.paramMap.get('company_id') ?? '';

    if (company_id == '') {
      alert("Invalid company");
      return;
    }

    await this.advertisementService.getCompanyProfile(company_id, String(this.seekerID), String(this.pageSize))
      .then((response) => {
        this.company = response;

        this.jobList = this.company.companyAdvertisements.firstPageAdvertisements;
        this.jobIdList = this.company.companyAdvertisements.allAdvertisementIds;

        this.company.company_business_scale = this.bussinessScale.find((x: any) => x.value == this.company.company_business_scale)?.name ?? '';
        
        if (this.company.company_logo == ""){
          this.company.company_logo = "../../../assets/Img.png";
        }

        this.paginatorLength = this.company.companyAdvertisements.allAdvertisementIds.length;

        if (this.jobList.length == 0) {
          this.router.navigate(['notfound']);
        }
      })
      .catch((error) => {
        this.router.navigate(['notfound']);
      });

    this.spinner.hide();
  }

  async handlePageEvent(e: PageEvent) {
    this.spinner.show();

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    let startIndex = this.pageIndex * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    this.jobList = 
      await this.advertisementService
        .getAllAdvertisementsWithPaginator(String(this.seekerID), this.jobIdList.slice(startIndex, endIndex));

    // scroll to the top of the page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.spinner.hide();
  }

  goBack() {
    window.history.back();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: undefined) {
    try{
      this.screenWidth = window.innerWidth;
    }
    catch {}
  }
}
