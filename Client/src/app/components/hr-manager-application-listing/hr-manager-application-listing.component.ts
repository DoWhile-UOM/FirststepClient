import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationService } from '../../../services/application.service';
import { MatButton } from '@angular/material/button';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';


interface HRMListing {
  title: string;
  job_number: number;
  field_name: string;
  current_status: string;
  applicationList: HRMApplicationList[];
}

interface HRMApplicationList {
  application_Id: number;
  seekerName: string;
  status: string;
  is_evaluated: boolean;
  assigned_hrAssistant_id: string ;
  submitted_date: string;
}

@Component({
  selector: 'app-hr-manager-application-listing',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbar,
    MatIcon,
    MatLabel,
    MatSelectModule,
    MatButton,
    SpinnerComponent,
    FormsModule,
  ],
  templateUrl: './hr-manager-application-listing.component.html',
  styleUrl: './hr-manager-application-listing.component.css',
})

export class HrManagerApplicationListingComponent implements OnInit {
  displayedColumns: string[] = [
    'application_Id',
    'seekerName',
    'status',
    'is_evaluated',
    'assigned_hrAssistant_id',
    'submitted_date',
    'icon',
  ];

  dataSource = new MatTableDataSource<HRMApplicationList>([]);
  jobID: number = 0;
  applicationList: HRMApplicationList[] = [];
  selectedFilter: string = 'all';
  applicationListLength: number = 0;
  title: string = 'Job Title';
  job_number: number = 0;
  field_name: string = ' ';
  current_status: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private applicationService: ApplicationService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private acRouter: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.spinner.show();

    this.jobID = Number(this.acRouter.snapshot.paramMap.get('jobID'));
    this.getApplicationList(this.jobID, this.selectedFilter);

    this.spinner.hide();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(selected: any){
    // filter by current status of the advertisement
    this.snackBar.open("Refeshing table to show " + selected.value + " Applications ...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.getApplicationList(this.jobID, selected.value);
    this.selectedFilter = selected.value;
  }

  async getApplicationList(jobID: number, status: string) {
    try {
      const listing: HRMListing = await this.applicationService.getApplicationList(jobID, status);
      
      if (!listing) {
        this.snackBar.open('Not applications found for the job id', "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
      }

      this.title = listing.title;
      this.job_number = listing.job_number; 
      this.field_name = listing.field_name;
      this.current_status = listing.current_status;
      this.applicationList = listing.applicationList || [];

      for (let i = 0; i < this.applicationList.length; i++) {
        var submitted_date = new Date(this.applicationList[i].submitted_date);
        this.applicationList[i].submitted_date = submitted_date.toLocaleString('default', { month: 'short' }) + " " + submitted_date.getDate() + ", " + submitted_date.getFullYear();
      }

      this.dataSource = new MatTableDataSource<HRMApplicationList>(this.applicationList);
      this.dataSource.paginator = this.paginator;
      this.applicationListLength = this.applicationList.length;

      if (this.applicationList.length === 0) {
        this.snackBar.open("Not application found", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
      }
    } catch (error) {
      this.snackBar.open("Error : " + error, "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
    }
  }

  onBackButtonClick(){
		window.history.back();
	}

  onEditClick(){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/updateJobDetails', {jobID: this.jobID}]);
  }

  explore(application_Id: number){
    alert("Exploring " + application_Id);
  }
}
