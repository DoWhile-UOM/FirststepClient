import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeService } from '../../../services/employee.service';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { TaskDelegationPopUpComponent } from '../task-delegation-pop-up/task-delegation-pop-up.component';
import { ConfirmDialog } from '../job-offer-list/job-offer-list.component';
import { MatDialog } from '@angular/material/dialog';

interface ApplicationListPage {
  title: string;
  job_number: number;
  field_name: string;
  company_id: number;
  hr_manager_name: string;
  role: string;
  current_status: string;
  applicationList: HRMApplicationList[];
}
interface HRMApplicationList {
  application_Id: number;
  seekerName: string;
  status: string;
  is_evaluated: boolean;
  assigned_hrAssistant_id: string;
  submitted_date: string;
}
@Component({
  selector: 'app-hr-manager-application-adData',
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
    MatMenuModule
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
  hraList: any[] = [];
  restrictPermissionForButton: boolean = false;
  unassignedApplicationCount: number = 0; 

  adData: ApplicationListPage | undefined;

  userType: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private applicationService: ApplicationService,
    private advertisementServices: AdvertisementServices,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private acRouter: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
  }

  async ngOnInit() {
    this.spinner.show();

    this.jobID = Number(this.acRouter.snapshot.paramMap.get('jobID'));
    this.userType = this.auth.getRole();

    if (this.userType == 'hra') {
      this.displayedColumns = this.displayedColumns.filter((column) => column !== 'assigned_hrAssistant_id');
      this.restrictPermissionForButton = true;
    }

    this.getApplicationList(this.jobID, this.selectedFilter);

    this.spinner.hide();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(selected: any) {
    // filter by current status of the advertisement
    this.snackBar.open("Refeshing table to show " + selected.value + " Applications ...", "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    this.getApplicationList(this.jobID, selected.value);
    this.selectedFilter = selected.value;
  }

  //Task Delegation
  openTaskDelegationDialog(): void {
    const dialogRef = this.dialog.open(TaskDelegationPopUpComponent, {
      width: '800px',
      data: { jobID: this.jobID, unassignedApplicationCount: this.unassignedApplicationCount }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delegateTasks(result);
      }
    });
  }

  async delegateTasks(hraIdList: number[]) {
    const hraIdsString = hraIdList.join(',');
    try {
      await this.applicationService.delegateTask(this.jobID, hraIdsString);
      this.snackBar.open('Tasks assigned successfully.', '', { panelClass: ['app-notification-success'] })._dismissAfter(3000);
      this.getApplicationList(this.jobID, this.selectedFilter);
    } catch (error) {
      this.snackBar.open('Error: ' + error, '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async getHraList(){
    try{
      this.hraList = await this.employeeService.getAllHRAs(this.auth.getCompanyID());
    } catch (error) {
      this.snackBar.open("Error : " + error, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async getApplicationList(jobID: number, status: string) {
    try {
      this.adData = {title: '', job_number: 0, field_name: '', company_id: 0, current_status: '', hr_manager_name: '', role: '', applicationList: []};
      
      if (this.userType == 'hra'){
        this.adData = await this.applicationService.getAssignedApplicationList(this.auth.getUserId(), jobID, status);
      }
      else if (this.userType == 'hrm' || this.userType == 'ca') {
        this.getHraList();
        this.adData = await this.applicationService.getApplicationList(jobID, status);
      }
      else {
        alert(this.userType);
        this.snackBar.open("You are not authorized to view this page", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
        this.router.navigate(['/notfound']);
      }

      if (!this.adData) {
        this.snackBar.open('Not applications found for the job id', "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        window.history.back();
        return;
      }

      if (this.adData.company_id != this.auth.getCompanyID()){
        this.snackBar.open("You are not authorized to view this page", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
        this.router.navigate(['/notfound']);
      }

      this.title = this.adData.title;
      this.job_number = this.adData.job_number; 
      this.field_name = this.adData.field_name;
      this.current_status = this.adData.current_status;
      this.applicationList = this.adData.applicationList || [];
      this.unassignedApplicationCount = this.applicationList.filter(app => !app.assigned_hrAssistant_id).length;

      for (let i = 0; i < this.applicationList.length; i++) {
        var submitted_date = new Date(this.applicationList[i].submitted_date);
        this.applicationList[i].submitted_date = submitted_date.toLocaleString('default', { month: 'short' }) + " " + submitted_date.getDate() + ", " + submitted_date.getFullYear();
      }

      this.dataSource = new MatTableDataSource<HRMApplicationList>(this.applicationList);
      this.dataSource.paginator = this.paginator;
      this.applicationListLength = this.applicationList.length;

      if (this.applicationList.length === 0) {
        this.snackBar.open("Not application found", "", { panelClass: ['app-notification-warning'] })._dismissAfter(3000);
      }
    } catch (error) {
      this.snackBar.open("Error : " + error, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  async assign(application_Id: number, hra_id: number){
    this.spinner.show();

    await this.applicationService.changeAssignedHRA(application_Id, hra_id);

    this.applicationList = this.applicationList.map((application) => {
      if (application.application_Id === application_Id) {
        application.assigned_hrAssistant_id = hra_id.toString();
      }
      return application;
    });

    this.dataSource = new MatTableDataSource<HRMApplicationList>(this.applicationList);
    this.dataSource.paginator = this.paginator;

    this.spinner.hide();
  }

  getHRAName(hra_id: number) {
    for (let i = 0; i < this.hraList.length; i++) {
      if (Number(this.hraList[i].user_id) == hra_id) {
        return this.hraList[i].first_name + ' ' + this.hraList[i].last_name;
      }
    }

    return 'Not Assigned';
  }

  onBackButtonClick() {
    window.history.back();
  }

  onEditClick() {
    this.router.navigate([this.auth.getRole() + '/jobOfferList/updateJobDetails', { jobID: this.jobID }]);
  }

  explore(application_Id: number) {
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList/applicationView', { applicationId: application_Id }]);
  }

  shortlist() {
    const jobData = {
      jobID: this.jobID,
      jobTitle: this.title,
      jobNumber: this.job_number,
    };
    this.advertisementServices.setJobData(jobData);
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList/shortlist']);
  }

  interviewBooked() {
    this.router.navigate([this.auth.getRole() + '/interview'],{ queryParams: { id: this.jobID } });
  }

  changeStatusOfJob(action: string){
    this.openConfirmDialogBox('250ms', '250ms', action, this.adData?.title || '', this.jobID);
  }

  openConfirmDialogBox(enterAnimationDuration: string, exitAnimationDuration: string, dialogtitle: string, adTitle: string, adId: number): void {
    this.dialog.open(ConfirmDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {dialogtitle: dialogtitle, title: adTitle, id: adId}
    });
  }

  getRoleDisplayName(): string {
    switch (this.adData?.role) {
      case 'hra':
        return 'Talent Acquisition Specialist';
      case 'ca':
        return 'Company Admin';
      case 'hrm':
        return 'HR Manager';
      default:
        return this.adData?.role || '';
    }
  }
}
