import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import { SpinnerComponent } from '../spinner/spinner.component';

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

interface BusinessScale{
  name: string,
  value: string
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

  BusinessScales : any[] = [
    {name: 'Micro-Sized (Lower Than 10 Employees)', value: 'micro'},
    {name: 'Small-Sized (10 - 50 Employees)', value: 'small'},
    {name: 'Medium-Sized (50 - 250 Employees)', value: 'medium'},
    {name: 'Large-Sized (More Than  250 Employees)', value: 'large'}
  ];

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
      setTimeout(() => {
        this.spinner.hide();
    }, 5000); 
    }
  }

  async applyChanges() {
    try {
      console.log('Company : ', this.company);
      this.spinner.show();
      await this.companyService.updateCompanyDetails(this.company, 7); // 7 for bistec
      console.log('updated');
    } finally {
      setTimeout(() => {
        this.spinner.hide();
    }, 5000); 
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
