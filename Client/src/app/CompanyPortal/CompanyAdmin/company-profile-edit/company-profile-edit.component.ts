import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../../services/company.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

interface Company {
  company_id: number;
  company_name: string;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  company_logo: string;
  company_description: string;
  company_city: string;
  company_province: string;
  company_business_scale: string;
}

@Component({
  selector: 'app-company-profile-edit',
  standalone: true,
  templateUrl: './company-profile-edit.component.html',
  styleUrl: './company-profile-edit.component.css',
  imports: [
    NavBarComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CdkTextareaAutosize,
    TextFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    NgxSpinnerModule,
    SpinnerComponent,
  ],
})
export class CompanyProfileEditComponent {
  selected = 'company.company_business_scale';
  selectedCity = 'company.company_city';
  selectedProvince = 'company.company_province';
  email = new FormControl('', [Validators.required, Validators.email]);

  company: Company = {} as Company; // Initialize the company property

  BScales: string[] = ['Large-Scale', 'Medium-Scale', 'Small-Scale'];

  constructor(
    private companyService: CompanyService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    try {
      this.spinner.show();

      this.company = await this.companyService.getCompanyDetails(7);

      // let selected = 'company.company_business_scale';
      console.log('got details');
    } finally {
      this.spinner.hide(); // Hide spinner after fetching (even on errors)
    }
  }

  async applyChanges() {
    try {
      console.log('Company : ', this.company);
      this.spinner.show();
      await this.companyService.updateCompanyDetails(this.company, 7); // 7 for bistec
      console.log('updated');
    } finally {
      this.spinner.hide(); // Hide spinner after request (even on errors)
    }
  }
  async discardChanges() {
    this.company = {} as Company;
    this.company = await this.companyService.getCompanyDetails(7);
    console.log('discarded changes');
  }

  async deleteAccount() {
    try {
      this.spinner.show();
      await this.companyService.deleteAccount(7);
      console.log('deleted');
    } finally {
      this.spinner.hide(); // Hide spinner after request (even on errors)
    }
  }
}
