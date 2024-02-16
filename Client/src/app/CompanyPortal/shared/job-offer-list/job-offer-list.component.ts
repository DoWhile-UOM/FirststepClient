import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../../services/advertisement.service';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; 
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  posted_date: string;
  no_of_applications: number;
  no_of_evaluated_applications: number;
  no_of_accepted_applications: number;
  no_of_rejected_applications: number;
  viewbtn: string;
  editbtn: string;
  deletebtn: string;
}


var Table_data: JobOfferTable[] = [];

var selectedAdTitle: string = "";
var selectedAdID: number = 0;

@Component({
  selector: 'app-job-offer-list',
  standalone: true,
  imports: [ MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    NavBarComponent, 
    MatIconModule,
    MatButtonModule,
    MatChipsModule],
  templateUrl: './job-offer-list.component.html',
  styleUrl: './job-offer-list.component.css'
})

export class JobOfferListComponent implements AfterViewInit{
  displayedColumns: string[] = ['Job Number', 'Title', 'Posted Date', 'Applications', 'Reviewed', 'Accepted', 'Rejected', 'Action'];
  dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  company_id: string = "7";
  jobList: JobOffer[] = [];

  constructor(
    private liveAnnouncer: LiveAnnouncer, 
    private advertisementService: AdvertisementServices,
    public dialog: MatDialog,
    private router: Router){
  }

  async ngOnInit() {
    this.refreshTable();
  }

  async refreshTable(){
    await this.advertisementService.getAllAdvertisementsByCompanyID(this.company_id)
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
            posted_date: this.jobList[i].posted_date,
            no_of_applications: this.jobList[i].no_of_applications,
            no_of_evaluated_applications: this.jobList[i].no_of_evaluated_applications,
            no_of_accepted_applications: this.jobList[i].no_of_accepted_applications,
            no_of_rejected_applications: this.jobList[i].no_of_rejected_applications,
            editbtn: "Edit",
            deletebtn: "Delete",
            viewbtn: "View"
          });
        }

        this.dataSource = new MatTableDataSource<JobOfferTable>(Table_data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } 
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewAd(adID: number){
    alert("Viewing job offer " + adID);
  }

  editAd(adID: number){
    alert("Editing job offer " + adID);
  }

  deleteAd(adID: number){
    // find title of the joboofer by using adId if the offer
    Table_data.forEach(element => {
      if (element.advertisement_id == adID) {
        selectedAdTitle = element.title;
        selectedAdID = adID;
      }
    });

    this.openDeleteDialog('250ms', '250ms');
    this.refreshTable();
  }

  exploreAd(adID: number){
    alert("Explore job " + adID);
  }

  addNew(){
    this.router.navigate(['/newJob']);
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
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
  title: string = selectedAdTitle; 
  id: number = selectedAdID;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    private advertisementService: AdvertisementServices,
    private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onYesClick() {
    await this.advertisementService.deleteAdvertisement(selectedAdID.toString());

    this.snackBar.open(selectedAdTitle + " job offer successfully deleted!")._dismissAfter(5000);

    this.dialogRef.close();
  }
}