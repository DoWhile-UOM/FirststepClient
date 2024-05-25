import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../services/advertisement.service';
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
import { Table } from '@syncfusion/ej2-angular-richtexteditor';
import { MatButton } from '@angular/material/button';

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
  assigned_hrAssistant_id: string;
  submitted_date: Date;
}
//check
var Table_data: HRMApplicationList[] = [];

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
    FormsModule,
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
    'icon'
  ];
  
  @ViewChild(MatTable) table!: MatTable<HRMApplicationList>;

  dataSource = new MatTableDataSource<HRMApplicationList>(Table_data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort = new MatSort();

  job_number: number = 1; //temp

  applicationList: HRMApplicationList[] = []; //check
  selectedFilter: string = 'all';
  applicationListLength: number = 0;

  title: string = ''; //check

  constructor(
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar
  ) {
    //to add service
    this.applicationListLength = 1;
  }

  //Getting details
  //HRMListing: HRMListing = {} as HRMListing;

  ngOnInit() {}

  async refreshTable(status: string, title: string) {
    //this.applicationListLength=1;

    if (this.applicationListLength == 0) {
      this.snackBar.open('No applications found', 'Close', {
        duration: 2000,
      });
    }

    Table_data = [];

    for (let i = 0; i < this.applicationListLength; i++) {
      Table_data.push({
        application_Id: this.applicationList[i].application_Id,
        seekerName: this.applicationList[i].seekerName,
        status: this.applicationList[i].status,
        is_evaluated: this.applicationList[i].is_evaluated,
        assigned_hrAssistant_id: this.applicationList[i].assigned_hrAssistant_id,
        submitted_date: this.applicationList[i].submitted_date,
       
      });
    }
    this.dataSource = new MatTableDataSource<HRMApplicationList>(Table_data);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.applicationListLength = this.applicationList.length;
  }

  ngAfterViewInit(): void {
    
  }
  filter(selected: any) {
    // filter by current status of the application
    this.snackBar.open("Refreshing table to show " + selected.value + " applications...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.refreshTable(selected.value, this.title.trim().toLowerCase());
    this.selectedFilter = selected.value;
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
