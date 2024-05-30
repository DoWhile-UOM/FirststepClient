import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

interface JobOffer{
  advertisement_id: number;
  job_number: number;
  title: string;
  field_name: string;
  no_of_applications: number;
  no_of_assigned_applications: number;
  no_of_evaluated_applications: number;
  no_of_nonevaluated_applications: number;
}

var Table_data: JobOffer[] = [];

@Component({
  selector: 'app-hrassistant-job-offer-list',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, SpinnerComponent, MatButtonModule],
  templateUrl: './hrassistant-job-offer-list.component.html',
  styleUrl: './hrassistant-job-offer-list.component.css'
})
export class HrassistantJobOfferListComponent {
  displayedColumns: string[] = ['Job Number', 'Title', 'Target Field', 'Applications', 'Assigned', 'Reviewed', 'NotReviewed', 'Action'];
  dataSource = new MatTableDataSource<JobOffer>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user_id: number = 0;
  company_name: string = "";

  jobList: JobOffer[] = [];
  jobListLength: number = 0;
  
  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private advertisementService: AdvertisementServices,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService) { 
      this.jobListLength = 1;
  }

  async refreshTable(){
    this.spinner.show();
    this.jobListLength = 1;

    await this.advertisementService.getAssignedAdvertisementsByHRA(String(this.user_id))
      .then((response) => {
        this.jobList = response;
      });

    if (this.jobList.length == 0) {
      this.snackBar.open("No job advertisements found!", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
    }

    Table_data = [];

    for (let i = 0; i < this.jobList.length; i++) {
      Table_data.push({
        advertisement_id: this.jobList[i].advertisement_id,
        job_number: this.jobList[i].job_number,
        title: this.jobList[i].title,
        field_name: this.jobList[i].field_name,
        no_of_applications: this.jobList[i].no_of_applications,
        no_of_evaluated_applications: this.jobList[i].no_of_evaluated_applications,
        no_of_assigned_applications: this.jobList[i].no_of_assigned_applications,
        no_of_nonevaluated_applications: this.jobList[i].no_of_nonevaluated_applications
      });
    }

    this.dataSource = new MatTableDataSource<JobOffer>(Table_data);

    this.dataSource.paginator = this.paginator;

    this.jobListLength = this.jobList.length;

    this.spinner.hide();
  }

  async ngOnInit() {
    try{
      this.user_id = Number(this.auth.getUserId());
      this.company_name = this.auth.getCompanyName();
    }
    catch (error){
      console.error(error);
    }

    this.refreshTable();
  }

  exploreAd(adID: number){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList', {jobID: adID}]);
  }
}
