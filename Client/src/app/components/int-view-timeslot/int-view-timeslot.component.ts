import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeService } from '../../../services/employee.service';

interface HRMListing {
  title: string;
  job_number: number;
  field_name: string;
  company_id: number;
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
  selector: 'app-int-view-timeslot',
  standalone: true,
  imports: [MatSlideToggleModule,
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
    MatMenuModule],
  templateUrl: './int-view-timeslot.component.html',
  styleUrl: './int-view-timeslot.component.css'
})
export class IntViewTimeslotComponent {
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
  hraList: any[] = [];
  restrictPermissionForButton: boolean = false;

  userType: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isExpansionDetailRow!: (index: number, rowData: any) => boolean;
expandedElement: any;

  constructor(
    private applicationService: ApplicationService,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private acRouter: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.spinner.show();

    //this.jobID = Number(this.acRouter.snapshot.paramMap.get('jobID'));
    this.jobID=1060; //test hardcode
    //this.userType = this.auth.getRole();
    this.userType = 'hrm';

    if (this.userType == 'hra'){
      this.displayedColumns = this.displayedColumns.filter((column) => column !== 'assigned_hrAssistant_id');
      this.restrictPermissionForButton = true;
    }
    
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

  async getHraList(){
    try{
      this.hraList = await this.employeeService.getAllHRAs(this.auth.getCompanyID());
    } catch (error) {
      this.snackBar.open("Error : " + error, "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
    }
  }

  async getApplicationList(jobID: number, status: string) {
    try {
      var listing: HRMListing = {title: '', job_number: 0, field_name: '', company_id: 0, current_status: '', applicationList: []};
      
      if (this.userType == 'hra'){
        listing = await this.applicationService.getAssignedApplicationList(this.auth.getUserId(), jobID, status);
      }
      else if (this.userType == 'hrm' || this.userType == 'ca'){ 
        this.getHraList();
        listing = await this.applicationService.getApplicationList(jobID, status);
      }
      else{
        alert(this.userType);
        this.snackBar.open("You are not authorized to view this page", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        this.router.navigate(['/notfound']);
      }
      
      if (!listing) {
        this.snackBar.open('Not applications found for the job id', "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        window.history.back();
      }

      if (listing.company_id != this.auth.getCompanyID()){
        this.snackBar.open("You are not authorized to view this page", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        this.router.navigate(['/notfound']);
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

  async assign(application_Id: number, hra_id: number){
    await this.applicationService.changeAssignedHRA(application_Id, hra_id);

    this.applicationList = this.applicationList.map((application) => {
      if (application.application_Id === application_Id) {
        application.assigned_hrAssistant_id = hra_id.toString();
      }
      return application;
    });

    this.dataSource = new MatTableDataSource<HRMApplicationList>(this.applicationList);
    this.dataSource.paginator = this.paginator;
  }

  getHRAName(hra_id: number){
    for (let i = 0; i < this.hraList.length; i++) {
      if (Number(this.hraList[i].user_id) == hra_id) {
        return this.hraList[i].first_name + ' ' + this.hraList[i].last_name;
      }
    }
    
    return 'Not Assigned';
  }

  onBackButtonClick(){
		window.history.back();
	}

  onEditClick(){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/updateJobDetails', {jobID: this.jobID}]);
  }

  explore(application_Id: number){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList/applicationView', {applicationId: application_Id}]);
  }
}
