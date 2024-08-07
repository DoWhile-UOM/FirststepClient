import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { response } from 'express';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { SaNavBarComponent } from '../../nav-bars/sa-nav-bar/sa-nav-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { retry } from 'rxjs';


interface CompanyList {
  company_id: number;
  company_name: string;
  verification_status: string;
  evaluated_status: string;
  view: string;
}

@Component({
  selector: 'app-company-application-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule,
    SpinnerComponent,
    CommonModule,
    SaNavBarComponent,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './company-application-list.component.html',
  styleUrl: './company-application-list.component.css',
})
export class CompanyApplicationListComponent {
  displayedColumns: string[] = ['company_name', 'verification_status', 'view'];

  @ViewChild(MatTable)
  table!: MatTable<CompanyList>;

  companyList: CompanyList[] = [];
  companyListLength: number = 0;
  selectedFilter: string = 'pending';

  totalItems = 100;
  pageSize = 10;
  currentPage = 0;

  items: CompanyList[] = [];

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
    this.companyListLength = 1;
  }

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.fetchData(this.selectedFilter);
  }
  ngAfterViewInit() {
    this.fetchData(this.selectedFilter);
  }

  async fetchData(status: string) {
    this.spinner.show();
    await this.companyService
      .getAllCompanyList()
      .then((data: any[]) => {
        this.companyList = data.map((item, index) => ({
          company_id: item.company_id, // Use company_id
          company_name: item.company_name,
          verification_status:
            item.verified_system_admin_id !== 0
              ? item.verification_status
                ? 'Registered'
                : 'Rejected'
              : 'Pending...',
          evaluated_status:
            item.verified_system_admin_id !== 0 ? 'Evaluated' : 'Not Evaluated',
          view: item.verified_system_admin_id !== 0 ? 'Review' : 'Evaluate',
        }));

        if (status == 'registered') {
          this.companyList = this.companyList.filter(
            (company) =>
              company.evaluated_status == 'Evaluated' &&
              company.verification_status == 'Registered'
          );
        } else if (status == 'rejected') {
          this.companyList = this.companyList.filter(
            (company) =>
              company.evaluated_status == 'Evaluated' &&
              company.verification_status == 'Rejected'
          );
        } else if (status == 'pending') {
          this.companyList = this.companyList.filter(
            (company) => company.evaluated_status == 'Not Evaluated'
          );
        }

        if (this.companyList.length == 0) {
          this.companyListLength = 0;
        }
        if (this.companyList.length != 0) {
          this.companyListLength = this.companyList.length;
        }
        this.items = this.companyList.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
        this.spinner.hide();
      })
      .catch((error) => {
        this.spinner.hide();
      });
  }
  filter(selected: any) {
    this.snackBar
      .open(
        'Refreshing table to show ' + selected.value + 'company list ',
        '',
        { panelClass: ['app-notification-normal'] }
      )
      ._dismissAfter(3000);
    this.fetchData(selected.value);
    this.selectedFilter = selected.value;
  }

  viewCompanyApplication(companyID: string) {
    this.route.navigate(['sa/company-application', companyID]);
  }
  getColor(status: string): string {
    if (status === 'Registered') {
      return 'registered';
    } else if (status === 'Rejected') {
      return 'rejected';
    } else {
      return 'pending';
    }
  }
  displayToolTip(status: string) {
    if (status === 'Evaluated') {
      return 'click to review the application';
    } else {
      return 'click to evaluate the application';
    }
  }
  //pagination
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.items = this.companyList.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
  }
}
