import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
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
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

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

  //@ViewChild(MatTable) table!: MatTable<HRMApplicationList>;

  dataSource = new MatTableDataSource<HRMApplicationList>([]);
  job_number: number = 1057; //temp
  applicationList: HRMApplicationList[] = [];
  selectedFilter: string = 'all';
  applicationListLength: number = 0;
  title: string = '';
  field_name: string = '';
  current_status: string = '';

  constructor(
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getApplicationList(this.job_number, this.selectedFilter);
  }

  async getApplicationList(job_number: number, status: string) {
    try {
      // Fetch the data from the service
      const listing: HRMListing =
        await this.applicationService.getApplicationList(job_number, status);

      // Set the job details
      this.title = listing.title;
      this.job_number = listing.job_number;
      this.field_name = listing.field_name;
      this.current_status = listing.current_status;

      // Set the application list
      this.applicationList = listing.applicationList;

      // Update the data source for the table
      this.dataSource = new MatTableDataSource<HRMApplicationList>(
        this.applicationList
      );

      // Update the application list length
      this.applicationListLength = this.applicationList.length;

      if (this.applicationListLength === 0) {
        this.snackBar.open('No applications found', 'Close', {
          duration: 2000,
        });
      }
    } catch (error) {
      this.snackBar.open('Failed to fetch applications', 'Close', {
        duration: 2000,
      });
      console.error('Error fetching applications:', error);
    } finally {
      this.spinner.hide();
    }
  }
}
