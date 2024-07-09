import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { CompanyApplicationListComponent } from '../company-application-list/company-application-list.component';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

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
interface CompanyList {
  company_id: number;
  company_name: string;
  verification_status: string;
  evaluated_status: string;
  view: string;
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
    MatTabsModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './systam-admin-dashboard.component.html',
  styleUrls: ['./systam-admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystamAdminDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['company_name', 'company_email'];
  companyList: CompanyList[] = [];

  @ViewChild(MatTable)
  table!: MatTable<EligibleUnregisteredCompany>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  eligibleUnregisteredCompanies: EligibleUnregisteredCompany[] = [];
  eligibleUnregisteredCompaniesLength: number = 0;
  isEligibleUnregCmpaniesLoading: boolean = false;

  pendingCompanies: number = 0;
  registeredCompanies: number = 0;
  rejectedCompanies: number = 0;
  eligibleNotRegisteredCompanies: number = 0;
  totalCompanies: number = 0;

  totalItems = 100;
  pageSize = 3;
  currentPage = 0;
  items: EligibleUnregisteredCompany[] = [];

  loggings: Logging = {} as Logging;

  active: number = 0;
  inactive: number = 0;

  percentageActiveCmpyUsers: number = 0;
  percentageActiveSeekers: number = 0;
  percentageActiveCA: number = 0;
  percentageActiveHRM: number = 0;
  percentageActiveHRA: number = 0;
  percentagePendingCompanies: number = 0;
  percentageRegisteredCompanies: number = 0;
  percentageRejectedCompanies: number = 0;
  percentageEligibleNotRegisteredCompanies: number = 0;

  subTab = 'active';
  tab = 'ca';
  catName = '';
  percentage: number = 0;

  readonly panelOpenState = signal(false);

  constructor(
    private spinner: NgxSpinnerService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.eligibleUnregisteredCompaniesLength = 1;
    this.loggings.eligibleUnregisteredCompaniesCount = 0;
  }

  ngOnInit(): void {
    this.fetchCompanyList();

    this.fetchEligibleUnregisteredCompanies();
    this.fetchLoggings();

    this.loggings.eligibleUnregisteredCompaniesCount = this.eligibleUnregisteredCompaniesLength;
  }

  async fetchCompanyList() {
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
        this.getPendingCompanies();
        this.getRegisteredCompanies();
        this.getRejectedCompanies();
        this.getCompanyListPercentages();
      })
      .catch((error) => {
        this.spinner.hide();
      });
  }
  getPendingCompanies() {
    this.pendingCompanies = this.companyList.filter((item) => item.verification_status == 'Pending...').length;
  }
  getRegisteredCompanies() {
    this.registeredCompanies = this.companyList.filter((item) => item.verification_status == 'Registered').length;
  }
  getRejectedCompanies() {
    this.rejectedCompanies = this.companyList.filter((item) => item.verification_status == 'Rejected').length;
  }
  getCompanyListPercentages() {
    this.percentageRegisteredCompanies = Number((this.registeredCompanies / (this.registeredCompanies + this.rejectedCompanies) * 100).toFixed(2));
    this.percentageRejectedCompanies = Number((this.rejectedCompanies / (this.registeredCompanies + this.rejectedCompanies) * 100).toFixed(2));
  }

  ngAfterViewInit() {
    this.fetchEligibleUnregisteredCompanies();
    this.fetchLoggings();

    this.loggings.eligibleUnregisteredCompaniesCount = this.eligibleUnregisteredCompaniesLength;
  }

  async fetchEligibleUnregisteredCompanies() {
    this.spinner.show();
    this.isEligibleUnregCmpaniesLoading = true;
    try {
      const data: any[] = await this.companyService.getEligibleUnregisteredCompanies();
      this.eligibleUnregisteredCompanies = data.map((item, index) => ({
        company_id: item.company_id,
        company_name: item.company_name,
        company_email: item.company_email,
        company_logo: item.company_logo,
      }));


      this.eligibleUnregisteredCompaniesLength = this.eligibleUnregisteredCompanies.length;
      this.items = this.eligibleUnregisteredCompanies.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
    } catch (error) {
      console.error(error);
    }
    this.isEligibleUnregCmpaniesLoading = false;
    this.spinner.hide();
  }
  async fetchLoggings() {
    try {
      this.spinner.show();
      this.loggings = await this.userService.getLogging();
      this.getPercentageActiveCmpyUsers();
      this.getPercentageActiveSeekers();
      this.getPercentageActiveCA();
      this.getPercentageActiveHRM();
      this.getPercentageActiveHRA();
      this.getEligibleUnregisteredCompanies();

    }
    finally {
      this.spinner.hide();
    }
  }
  getEligibleUnregisteredCompanies() {
    this.percentageEligibleNotRegisteredCompanies = Number(((this.eligibleUnregisteredCompaniesLength / (this.registeredCompanies)) * 100).toFixed(2));
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.items = this.eligibleUnregisteredCompanies.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
  }
  onTabChange(event: MatTabChangeEvent): void {
    if (event.tab.textLabel === 'CA') {
      this.active = this.loggings.activeCA;
      this.inactive = this.loggings.inactiveCA;
      this.tab = 'ca';
    }
    else if (event.tab.textLabel === 'HRM') {
      this.active = this.loggings.activeHRM;
      this.inactive = this.loggings.inactiveHRM;
      this.tab = 'hrm';
    }
    else if (event.tab.textLabel === 'HRA') {
      this.active = this.loggings.activeHRA;
      this.inactive = this.loggings.inactiveHRA;
      this.tab = 'hra';
    }
    else {
      this.active = this.loggings.activeCA;
      this.inactive = this.loggings.inactiveCA;
      this.tab = 'ca';
    }
  }
  onSubTabChange(event: MatTabChangeEvent): void {
    if (event.tab.textLabel === 'Active') {
      this.subTab = 'active';
    }
    else if (event.tab.textLabel === 'Inactive') {
      this.subTab = 'inactive';
    }
    else {
      this.subTab = 'active';
    }
    this.calculatePercentage();
  }

  calculatePercentage() {
    if (this.subTab === 'active') {
      if (this.tab === 'ca') {
        this.percentage = this.percentageActiveCA;
        this.catName = 'Active Company Admins';
      }
      else if (this.tab === 'hrm') {
        this.percentage = this.percentageActiveHRM;
        this.catName = 'Active HR Managers';
      }
      else if (this.tab === 'hra') {
        this.percentage = this.percentageActiveHRA;
        this.catName = 'Active Talent Acquisition Specialists';
      }
    }
    else {
      if (this.tab === 'ca') {
        this.percentage = 100 - this.percentageActiveCA;
        this.catName = 'Inactive Company Admins';
      }
      else if (this.tab === 'hrm') {
        this.percentage = 100 - this.percentageActiveHRM;
        this.catName = 'HR Managers';
      }
      else if (this.tab === 'hra') {
        this.percentage = 100 - this.percentageActiveHRA;
        this.catName = 'Talent Acquisition Specialists';
      }
    }
  }
  getPercentageActiveCmpyUsers() {
    this.percentageActiveCmpyUsers = Number((this.loggings.activeCmpUsers / (this.loggings.activeCmpUsers + this.loggings.inactiveCmpUsers) * 100).toFixed(2));
  }
  getPercentageActiveSeekers() {
    this.percentageActiveSeekers = Number((this.loggings.activeSeeker / (this.loggings.activeSeeker + this.loggings.inactiveSeeker) * 100).toFixed(2));
  }
  getPercentageActiveCA() {
    this.percentageActiveCA = Number((this.loggings.activeCA / (this.loggings.activeCA + this.loggings.inactiveCA) * 100).toFixed(2));
  }
  getPercentageActiveHRM() {
    this.percentageActiveHRM = Number((this.loggings.activeHRM / (this.loggings.activeHRM + this.loggings.inactiveHRM) * 100).toFixed(2));
  }
  getPercentageActiveHRA() {
    this.percentageActiveHRA = Number((this.loggings.activeHRA / (this.loggings.activeHRA + this.loggings.inactiveHRA) * 100).toFixed(2));
  }
}
