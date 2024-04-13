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
import { SaNavBarComponent } from '../../nav-bars/sa-nav-bar/sa-nav-bar.component';

interface CompanyList {
  company_id: number;
 
  company_name: string;
  verification_status: string;
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
    CommonModule,SaNavBarComponent
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
  table!: MatTable<CompanyList>;

  companyList: CompanyList[] = [];
  companyListLength: number = 0;
  selectedFilter: string = 'all';

  constructor(public dialog:MatDialog,private companyService: CompanyService, private route:Router,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) {
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
        if(status == 'registered'){
          this.companyList = this.companyList.filter(company => company.verification_status === 'Registered');
        }
        else if(status =='unregistered'){
          this.companyList = this.companyList.filter(company => company.verification_status === 'Pending...');
        }
        console.log('Company List', data);
        
        if(this.companyList.length == 0){
          this.companyListLength = 0;
        } 
        this.spinner.hide();
        
      })
      .catch((error) => {
        console.log('error', error);
        this.spinner.hide();
      });
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
      this.fetchData(selected.value);
      this.selectedFilter = selected.value;

  }

  viewCompanyApplication(companyID:string){
    this.route.navigate(['/company-application',companyID]);
  }
  
  
}
