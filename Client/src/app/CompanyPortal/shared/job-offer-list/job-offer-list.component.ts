import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../../services/advertisement.service';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { CaNavBarComponent } from '../../CompanyAdmin/ca-nav-bar/ca-nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NewJobComponent } from '../new-job/new-job.component';

interface JobOffer{
  advertisement_id: number;
  job_number: number;
  title: string;
  posted_date: string;
  current_status: string;
  field_name: string;
  no_of_applications: number;
  no_of_evaluated_applications: number;
  no_of_accepted_applications: number;
  no_of_rejected_applications: number;
}

interface JobOfferTable{
  advertisement_id: number;
  job_number: number;
  title: string;
  status: string;
  posted_date: string;
  no_of_applications: number;
  no_of_evaluated_applications: number;
  no_of_accepted_applications: number;
  no_of_rejected_applications: number;
}

var Table_data: JobOfferTable[] = [];

@Component({
  selector: 'app-job-offer-list',
  standalone: true,
  imports: [ MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NavBarComponent,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CaNavBarComponent,
    FormsModule,
    CommonModule,
    MatCardModule,
    NewJobComponent],
  templateUrl: './job-offer-list.component.html',
  styleUrl: './job-offer-list.component.css'
})

export class JobOfferListComponent implements AfterViewInit{
  displayedColumns: string[] = ['Job Number', 'Title', 'Posted Date', 'Status', 'Applications', 'Reviewed', 'Accepted', 'Rejected', 'Action'];
  dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  company_id: string = "7";

  jobList: JobOffer[] = [];
  selectedFilter: string = 'active';
  jobListLength: number = 0;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private advertisementService: AdvertisementServices,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar){
      this.jobListLength = 1;
  }

  async ngOnInit() {

  }

  async refreshTable(status: string){
    this.jobListLength = 1;
    await this.advertisementService.getAllAdvertisementsByCompanyID(this.company_id, status)
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }

        Table_data = [];

        for (let i = 0; i < this.jobList.length; i++) {

          Table_data.push({
            advertisement_id: this.jobList[i].advertisement_id,
            job_number: this.jobList[i].job_number,
            title: this.jobList[i].title,
            status: this.jobList[i].current_status.toLowerCase(),
            posted_date: this.jobList[i].posted_date,
            no_of_applications: this.jobList[i].no_of_applications,
            no_of_evaluated_applications: this.jobList[i].no_of_evaluated_applications,
            no_of_accepted_applications: this.jobList[i].no_of_accepted_applications,
            no_of_rejected_applications: this.jobList[i].no_of_rejected_applications
          });
        }

        this.dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.jobListLength = this.jobList.length;
      });
  }

  ngAfterViewInit() {
    this.refreshTable(this.selectedFilter);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter(selected: any){
    // filter by current status of the advertisement
    this.snackBar.open("Refeshing table to show " + selected.value + " job offers...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.refreshTable(selected.value);
    this.selectedFilter = selected.value;
  }

  editAd(adID: number){
    this.router.navigate(['jobOfferList/updateJobDetails', {jobID: adID}]);
  }

  changeStatusOfJob(adID: number, action: string){
    // find title of the joboofer by using adId if the offer
    Table_data.forEach(element => {
      if (element.advertisement_id == adID) {
        this.openConfirmDialogBox('250ms', '250ms', action, element.title, adID);
        return;
      }
    });
  }

  exploreAd(adID: number){
    alert("Explore job " + adID);
  }

  addNew(){
    //this.router.navigate(['jobOfferList/newJob']);
    this.router.navigate(['jobOfferList/newJob']);
  }

  openConfirmDialogBox(enterAnimationDuration: string, exitAnimationDuration: string, dialogtitle: string, adTitle: string, adId: number): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {dialogtitle: dialogtitle, title: adTitle, id: adId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable(this.selectedFilter);
    });
  }
}


@Component({
  selector: 'confirm',
  templateUrl: 'confirm.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmDialog {
  title: string = "";
  id: number = 0;
  dialogtitle: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    private advertisementService: AdvertisementServices,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.title = data.title;
    this.id = data.id;
    this.dialogtitle = data.dialogtitle;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onYesClick() {
    if (this.dialogtitle == "Close") {
      await this.advertisementService.closeAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully deleted!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Activate") {
      await this.advertisementService.activateAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully activate again!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }

    this.dialogRef.close();
  }
}
