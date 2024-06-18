import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
interface EligibleUnregisteredCompany {
  company_id: number;
  company_name: string;
  company_email: string;
  company_logo: string;
}
interface Logging {
  activeTot: number;
  inactiveTot: number;
  activeCA: number;
  inactiveCA: number;
  activeHRM: number;
  inactiveHRM: number;
  activeHRA: number;
  inactiveHRA: number;
  activeSeeker: number;
  inactiveSeeker: number;
  activeCmpUsers: number;
  inactiveCmpUsers: number;
  eligibleUnregisteredCompaniesCount: number;
}

@Component({
  selector: 'app-systam-admin-dashboard',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTabsModule
  ],
  templateUrl: './systam-admin-dashboard.component.html',
  styleUrls: ['./systam-admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystamAdminDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['company_name', 'company_email'];

  @ViewChild(MatTable)
  table!: MatTable<EligibleUnregisteredCompany>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  eligibleUnregisteredCompanies: EligibleUnregisteredCompany[] = [];
  eligibleUnregisteredCompaniesLength: number = 0;
  isEligibleUnregCmpaniesLoading: boolean = false;

  totalItems = 100;
  pageSize = 3;
  currentPage = 0;
  items: EligibleUnregisteredCompany[] = [];

  loggings: Logging = {} as Logging;

  readonly panelOpenState = signal(false);

  constructor(
    private spinner: NgxSpinnerService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.eligibleUnregisteredCompaniesLength = 1;
  }

  ngOnInit(): void {
    console.log('inside onInit');
    this.fetchEligibleUnregisteredCompanies();
    this.fetchLoggings();
  }

  ngAfterViewInit() {
    this.fetchEligibleUnregisteredCompanies();
    this.fetchLoggings();
  }

  async fetchEligibleUnregisteredCompanies() {
    console.log('inside fetchEligibleUnregisteredCompanies');
    this.isEligibleUnregCmpaniesLoading = true;
    try {
      const data: any[] = await this.companyService.getEligibleUnregisteredCompanies();
      this.eligibleUnregisteredCompanies = data.map((item, index) => ({
        company_id: item.company_id,
        company_name: item.company_name,
        company_email: item.company_email,
        company_logo: item.company_logo,
      }));

      console.log('got the eligible companies');
      this.eligibleUnregisteredCompaniesLength = this.eligibleUnregisteredCompanies.length;
      this.items = this.eligibleUnregisteredCompanies.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
    } catch (error) {
      console.error(error);
    }
    this.isEligibleUnregCmpaniesLoading = false;
  }
  async fetchLoggings() {
    try {
      this.spinner.show();
      this.loggings = await this.userService.getLogging();
    }
    finally {
      this.spinner.hide();
    }
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.items = this.eligibleUnregisteredCompanies.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
  }
}
