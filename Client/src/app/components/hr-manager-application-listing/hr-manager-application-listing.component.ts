import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationService } from '../../../services/application.service';


interface HRMListing {
  title: string;
  job_number: number;
  field_name:string;
  current_status: string;
  applicationList: HRMApplicationList[];
}
interface HRMApplicationList{
  application_Id: number;
  seekerName: string;
  status: string;
  is_evaluated: boolean;
  assigned_hrAssistant_id: string;
  submitted_date: Date;

}
var Table_data: HRMApplicationList[] = [];

@Component({
  selector: 'app-hr-manager-application-listing',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatSortModule, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatChipsModule, FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbar, MatIcon, MatLabel, MatSelectModule],
  templateUrl: './hr-manager-application-listing.component.html',
  styleUrl: './hr-manager-application-listing.component.css'
})

export class HrManagerApplicationListingComponent implements OnInit {
  displayedColumns: string[] = ['application_Id', 'seekerName', 'status', 'is_evaluated', 'assigned_hrAssistant_id', 'submitted_date'];
  dataSource: MatTableDataSource<HRMApplicationList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  job_number: number = 1; //temp

  applications: HRMApplicationList[] = []; //check
  selectedFilter: string = 'assigned';
  applicationsLength: number = 0;

  title: string = ""; 

  constructor(private applicationService: ApplicationService, private snackBar: MatSnackBar) { //to add service
    this.dataSource = new MatTableDataSource<HRMApplicationList>(this.applications);
  }

  //Getting details
  HRMListing: HRMListing = {} as HRMListing;

  ngOnInit() {
    this.refreshTable(this.selectedFilter, this.title);
  }

  refreshTable(status: string, title: string) {
    this.applicationService.getHRMListing(this.job_number,status)
  .then((applications: HRMApplicationList[]) => {
    this.applications = applications;
    this.dataSource.data = this.applications;
    this.applicationsLength = this.applications.length;
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }
}




      
  
  //     //table
  //     await this.applicationService.getAllApplicationsbyAdvertisementID(this.job_id).then((response) => {
  //       this.applications = response;
  //       console.log(this.applications);
  //     });
  //   }
  
  //   async refreshTable(status:string,) {}
  
  //    //table
  
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  
  
  //new
  
  
  

