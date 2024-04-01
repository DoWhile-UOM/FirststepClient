import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';
import { CaNavBarComponent } from '../ca-nav-bar/ca-nav-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';

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

interface BusinessScale {
  name: string;
  value: string;
}

@Component({
  selector: 'app-company-profile-edit',
  standalone: true,
  templateUrl: './company-profile-edit.component.html',
  styleUrl: './company-profile-edit.component.css',
  imports: [
    MatGridListModule,
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
    CaNavBarComponent,
    MatCardModule,
    CommonModule,
  ],
})
export class CompanyProfileEditComponent {
  selected = 'company.company_business_scale';
  email = new FormControl('', [Validators.required, Validators.email]);
  company: Company = {} as Company; // Initialize the company property
  cName = ''; // to store Comapny Name that is on the top
  noOfCols: number = 2;
  BusinessScales: any[] = [
    { name: 'Micro-Sized (Lower Than 10 Employees)', value: 'micro' },
    { name: 'Small-Sized (10 - 50 Employees)', value: 'small' },
    { name: 'Medium-Sized (50 - 250 Employees)', value: 'medium' },
    { name: 'Large-Sized (More Than  250 Employees)', value: 'large' },
  ];

  companyForm: FormGroup = new FormGroup({});

  errorMessageForCompanyName = '';
  errorMessageForDescription = '';
  errorMessageForWebsite = '';
  errorMessageForPhoneNumber = '';
  errorMessageForEmail = '';
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    try {
      this.spinner.show();

      this.company = await this.companyService.getCompanyDetails(7);
      this.cName = this.company.company_name;
      console.log('got details');
    } finally {
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
  }

  async onSubmit() {
    try {
      console.log('Company : ', this.company);
      this.spinner.show();
      console.log(this.company);
      await this.companyService.updateCompanyDetails(this.company, 7); // 7 for bistec
      this.cName = this.company.company_name;
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
      this.spinner.hide();
    }
  }

  //errorMessages

  comapnyNameErrorMessage() {
    if (this.company.company_name.length == 0) {
      this.errorMessageForCompanyName = 'Company name is required';
    } else {
      this.errorMessageForCompanyName = '';
    }
  }
  descriptionErrorMessage() {
    if (this.company.company_description.length == 0) {
      this.errorMessageForDescription = 'Description is required';
    } else {
      this.errorMessageForDescription = '';
    }
  }
  websiteErrorMessage() {
    if (this.company.company_website.length == 0) {
      this.errorMessageForWebsite = 'Website is required';
    } else {
      this.errorMessageForWebsite = '';
    }
  }
  phoneNumberErrorMessage() {
    if (this.company.company_phone_number.toString().length == 0) {
      this.errorMessageForPhoneNumber = 'Phone number is required';
    } else if (
      this.company.company_phone_number.toString().length > 0 &&
      this.company.company_phone_number.toString().length < 10
    ) {
      this.errorMessageForPhoneNumber = 'Phone number is invalid';
    } else {
      this.errorMessageForPhoneNumber = '';
    }
  }
  // emailErrorMessage() {
  //   let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (this.company.company_email.length == 0) {
  //     this.errorMessageForEmail = 'Email is required';
  //   }
  //   if (!emailRegex.test(this.company.company_email)) {
  //     console.log(!emailRegex.test(this.company.company_email));
  //     this.errorMessageForEmail = 'Email is invalid';
  //     console.log(this.errorMessageForEmail);
  //   } else {
  //     console.log(!emailRegex.test(this.company.company_email));
  //     this.errorMessageForEmail = '';
  //   }
  // }
  emailErrorMessage() {
    this.emailControl.setValue(this.company.company_email);

    if (this.emailControl.hasError('required')) {
      this.errorMessageForEmail = 'Email is required';
    } else if (this.emailControl.hasError('email')) {
      this.errorMessageForEmail = 'Email is invalid';
    } else {
      this.errorMessageForEmail = '';
    }
  }
}
