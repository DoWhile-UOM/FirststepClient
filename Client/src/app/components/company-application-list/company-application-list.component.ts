import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { response } from 'express';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';

interface CompanyList {
  company_id: number;
 
  company_name: string;
  verification_status: string;
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
    'company_name',
    'verification_status',
    'view'
  ];
 

  @ViewChild(MatTable)
  table!: MatTable<CompanyApplication>;

  companyList: CompanyList[] = [];
  companyListLength: number = 0;

  constructor(public dialog:MatDialog,private companyService: CompanyService, private route:Router,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) {
    this.companyListLength = 1;
  }

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

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.fetchData();
  
  }
  
  async fetchData() {
    console.log('Fetching data');
    await this.companyService
      .getAllCompanyList()
      .then((data: any[]) => {
        this.companyList = data.map((item,index)=>({ 
          company_id: item.company_id, // Use company_id
          company_name: item.company_name,
          verification_status: item.verification_status ? 'Registered' : 'Pending...',
          view: item.verification_status? 'Review':'Evaluate',
          
        }));
        console.log('Company List', data);
        
        if(this.companyList.length == 0){
          this.companyListLength = 0;
        } 
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  //end of fetch data


  // // companyList: CompanyList[] = [];
  // selectedFilter: string = 'active';
  // companyListLength: number = 0;

  // constructor(
  //   private snackBar: MatSnackBar,
  //   private companyService: CompanyService,
  //   private route: Router,
  //   private spinner: NgxSpinnerService
  // ) {
  //   this.companyListLength = 1;
  // }
  // async ngOnInit() {}

 
  // async refreshTable(status: string) {
  //   this.spinner.show();
  //   await this.companyService
  //     .getAllCompanyList()

  //     .then((response) => {
  //       this.companyList = response;
  //       console.log('Compnay list', response);
  //       if (this.companyList.length == 0) {
  //         this.companyListLength = 0;
  //       }

  //       Table_data = [];
  //       for (let i = 0; i < this.companyList.length; i++) {
  //         Table_data.push({
  //           company_id: this.companyList[i].company_id,
  //           company_name: this.companyList[i].company_name,
  //           verification_status: this.companyList[i].verification_status,
  //         });
  //       }
  //       this.dataSource = new MatTableDataSource<CompanyListTable>(Table_data);
  //       this.dataSource.sort = this.sort;

  //       this.companyListLength = this.companyList.length;
  //     })
  //     .catch((error) => {
  //       console.log('error');
  //       this.spinner.hide();
  //     });
  // }

  // ngAfterViewInit() {
  //   this.refreshTable(this.selectedFilter);
  // }
}
