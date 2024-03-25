import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { response } from 'express';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { error } from 'console';
interface CompanyList {
  company_id: number;
  company_name: string;
  verification_status: boolean;
}
interface CompanyApplication {
  company_id: number;
  company_name: string;
  verification_status: boolean;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  business_reg_certificate: string;
  certificate_of_incorporation: string;
  comment: string;
}
interface CompanyListTable {
  company_id: number;
  company_name: string;
  verification_status: boolean;
}
var Table_data: CompanyListTable[] = [];
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
  ],
  templateUrl: './company-application-list.component.html',
  styleUrl: './company-application-list.component.css',
})
export class CompanyApplicationListComponent {
  displayedColumns: string[] = [
    'company_id',
    'company_name',
    'verification_status',
  ];
  dataSource = new MatTableDataSource<CompanyList>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  companyList: CompanyList[] = [];

  // companyList: CompanyList[] = [];
  selectedFilter: string = 'active';
  companyListLength: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private companyService: CompanyService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {
    this.companyListLength = 1;
  }
  async ngOnInit() {}

  filter(selected: any) {
    //filter by status of the company list
    this.snackBar
      .open(
        'Refreshing table to show ' + selected.value + 'company list ',
        '',
        { panelClass: ['app-notification-normal'] }
      )
      ._dismissAfter(3000);
  }
  async refreshTable(status: string) {
    this.spinner.show();
    await this.companyService
      .getAllCompanyList()

      .then((response) => {
        this.companyList = response;
        console.log('Compnay list', response);
        if (this.companyList.length == 0) {
          this.companyListLength = 0;
        }

        Table_data = [];
        for (let i = 0; i < this.companyList.length; i++) {
          Table_data.push({
            company_id: this.companyList[i].company_id,
            company_name: this.companyList[i].company_name,
            verification_status: this.companyList[i].verification_status,
          });
        }
        this.dataSource = new MatTableDataSource<CompanyListTable>(Table_data);
        this.dataSource.sort = this.sort;

        this.companyListLength = this.companyList.length;
      })
      .catch((error) => {
        console.log('error');
        this.spinner.hide();
      });
  }

  ngAfterViewInit() {
    this.refreshTable(this.selectedFilter);
  }
}
