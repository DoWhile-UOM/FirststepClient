import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './job-offer-list.component.html',
  styleUrl: './job-offer-list.component.css'
})

export class JobOfferListComponent implements AfterViewInit{
  displayedColumns: string[] = ['Job Number', 'Title', 'Posted Date', 'Status', 'Applications', 'Reviewed', 'Accepted', 'Rejected', 'Action'];
  dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  company_id: string = '';

  jobList: JobOffer[] = [];
  selectedFilter: string = 'active';
  jobListLength: number = 0;

  title: string = "";

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

  async refreshTable(status: string, title: string){
    this.jobListLength = 1;

    if (title == ""){
      await this.advertisementService.getAllAdvertisementsByCompanyID(this.company_id, status)
      .then((response) => {
        this.jobList = response;
      });
    }
    else{
      await this.advertisementService.getAllAdvertisementsByCompanyIDAndSearch(this.company_id, status, title)
      .then((response) => {
        this.jobList = response;
      });
    }

    if (this.jobList.length == 0) {
      this.snackBar.open("No job advertisements found!", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
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
  }

  ngAfterViewInit() {
    // get the compnay id from the session storage
    try {
      this.company_id = sessionStorage.getItem('companyId') || '';
    } catch (error) {
      //console.log(error); //raises the error
      this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
      this.router.navigate(['/notfound']);
      return;
    }

    this.refreshTable(this.selectedFilter, "");
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
    this.refreshTable(selected.value, this.title.trim().toLowerCase());
    this.selectedFilter = selected.value;
  }

  editAd(adID: number){
    this.router.navigate(['ca/jobOfferList/updateJobDetails', {jobID: adID}]);
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
    this.router.navigate(['ca/jobOfferList/newJob']);
  }

  search(){
    this.snackBar.open("Refeshing table to show " + this.selectedFilter + " job offers...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.refreshTable(this.selectedFilter, this.title.trim().toLowerCase());
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
      this.refreshTable(this.selectedFilter, this.title.trim().toLowerCase());
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

  canDelete: boolean = true;

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
    if (this.dialogtitle == "Delete" && !this.canDelete) {
      await this.advertisementService.deleteAdvertisementWithApplication(this.id.toString());
      this.snackBar.open(this.title + " job successfully deleted!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }

    if (this.dialogtitle == "Close") {
      await this.advertisementService.closeAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully closed!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Hold") {
      await this.advertisementService.holdAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully evaluating!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Activate") {
      await this.advertisementService.activateAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully activate again!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Delete" && this.canDelete) {
      var res = await this.advertisementService.deleteAdvertisement(this.id.toString());
      if (res == null) {
        this.canDelete = false;
        return;
      }
      else{
        this.snackBar.open(this.title + " job successfully deleted!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
      }
    }

    this.dialogRef.close();
  }
}