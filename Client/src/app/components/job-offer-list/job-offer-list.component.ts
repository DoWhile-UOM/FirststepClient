import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

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
  field_name: string;
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
    MatInputModule,
    MatMenuModule,
    SpinnerComponent],
  templateUrl: './job-offer-list.component.html',
  styleUrl: './job-offer-list.component.css'
})

export class JobOfferListComponent implements OnInit{
  displayedColumns: string[] = ['Job Number', 'Title', 'Target Field', 'Posted Date', 'Status', 'Applications', 'Reviewed', 'Accepted', 'Rejected', 'Action'];
  dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  emp_id: string = '';
  company_name: string = '';

  jobList: JobOffer[] = [];
  selectedFilter: string = 'active';
  jobListLength: number = 0;

  title: string = "";

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private advertisementService: AdvertisementServices,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService) { 
      this.jobListLength = 1;
  }

  async refreshTable(status: string, title: string){
    this.spinner.show();
    this.jobListLength = 1;

    if (title == ""){
      await this.advertisementService.getAllAdvertisementsByCompanyID(this.emp_id, status)
      .then((response) => {
        this.jobList = response;
      });
    }
    else{
      await this.advertisementService.getAllAdvertisementsByCompanyIDAndSearch(this.emp_id, status, title)
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
        field_name: this.jobList[i].field_name,
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

    this.spinner.hide();
  }

  async ngOnInit() {
    try{
      this.emp_id = this.auth.getUserId() || '';
      this.company_name = this.auth.getCompanyName() || '';
    }
    catch (error){
      console.error(error);
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
    this.router.navigate([this.auth.getRole() + '/jobOfferList/updateJobDetails', {jobID: adID}]);
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
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList', {jobID: adID}]);
  }

  addNew(){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/newJob']);
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
    public dialog: MatDialog,
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
      await this.advertisementService.deleteAdvertisementWithConfirm(this.id.toString());
      this.snackBar.open(this.title + " job successfully deleted!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }

    if (this.dialogtitle == "Close") {
      await this.advertisementService.closeAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully closed!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Hold") {
      await this.advertisementService.holdAdvertisement(this.id.toString());
      this.snackBar.open(this.title + " job offer successfully set as evaluating job!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
    }
    else if (this.dialogtitle == "Activate") {
      let res = await this.advertisementService.activateAdvertisement(this.id.toString());

      if (res === "Invalid Deadline"){
        let dialogRef = this.dialog.open(JobActivateDialog, {
          width: '400px',
          enterAnimationDuration: '50ms',
          exitAnimationDuration: '50ms',
          disableClose: true,
          data: { title: this.title, id: this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.dialogRef.close();
          return;
        });
      }
      else{
        this.snackBar.open(this.title + " job offer successfully activate again!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
      }
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


@Component({
  selector: 'job-activate-dialog',
  templateUrl: 'job-activate-dialog.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule, MatButtonModule, MatDialogActions, 
    MatDialogClose, FormsModule, MatDialogTitle, 
    MatDialogContent, MatFormFieldModule, MatDatepickerModule, MatCheckboxModule],
})
export class JobActivateDialog{
  @ViewChild('defulatButton') confirmBtn: ElementRef | undefined;

  title: string = "";
  id: number = 0;
  submission_deadline: string = '';
  is_ignore_deadline: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<JobActivateDialog>,
    private snackBar: MatSnackBar,
    private advertisementService: AdvertisementServices,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.title = data.title;
    this.id = data.id;
    this.submission_deadline = String(new Date(Date.now()));
    this.confirmBtn?.nativeElement.focus();
  }

  async onConfirmClick() {
    let res;

    if (this.is_ignore_deadline == true){
      res = await this.advertisementService.activateAdvertisementAndChangeDeadline(this.id.toString(), "-1");
    }
    else if (this.submission_deadline == null){ 
      this.snackBar.open("Please select a valid date!", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
      return;
    }
    else if (this.submission_deadline != ''){
      let deadline = new Date(this.submission_deadline).toUTCString();

      if (new Date(this.submission_deadline) < new Date(Date.now())){
        this.snackBar.open("Application deadline must be a future date!", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        return;
      }
      
      res = await this.advertisementService.activateAdvertisementAndChangeDeadline(this.id.toString(), deadline);
    }
    else{
      res = await this.advertisementService.activateAdvertisementAndChangeDeadline(this.id.toString(), "-1");
    }

    if (res){
      this.snackBar.open(this.title + " job offer successfully activate again!", "", {panelClass: ['app-notification-normal']})._dismissAfter(5000);
      this.dialogRef.close();
    }
    else{
      this.snackBar.open("Failed to activate!", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
      return;
    }
  }
}