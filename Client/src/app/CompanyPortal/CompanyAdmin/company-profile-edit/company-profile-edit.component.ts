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
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Company } from '../../../../models/company';

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
    HttpClientModule,
  ],
})
export class CompanyProfileEditComponent {
  //sample code starts here
  selected = 'option2';
  selectedCity = 'option1';
  selectedProvince = 'option1';
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //sample code ends here

  //actual code starts here

  readonly APIURL = 'https://localhost:7213/api/Company'; // put the actual url here

  constructor(private http: HttpClient) {}

  details: any = [];

  getDefaultValues() {
    var company: Company;
    const companyId = 8; // sample company_id
    this.http.get(this.APIURL + 'GetCompanyDetails/' + companyId).subscribe(
      (res: any) => {
        console.log('Response:', res);
        company = res;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getDefaultValues(); // sample company_id
  }

  [x: string]: any;
  emp_role: string = 'Non';
  id = 1;
  name = 'Bistec Global';
  description = 'Bistec Global is a software company';
  website = 'www.bistecglobal.com';
  business_scale = 'Small';
  phone_number = 1234567890;
  c_email = 'bistecglobal@gmail.com';
  city = 'Calgary';
  province = 'Alberta';

  updateDetails() {
    var company = new Company(
      this.id,
      this.name,
      this.description,
      this.website,
      this.business_scale,
      this.phone_number,
      this.c_email,
      this.city,
      this.province
    ); // Initialize company if it's not already defined
    const companyId = 8; // sample company_id
    this.http.get(this.APIURL + 'GetCompanyDetails/' + companyId).subscribe(
      (res: any) => {
        console.log('Response:', res);
        company = res;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  discardChanges() {
    this.http.delete(this.APIURL + 'DeleteCompanyDetails').subscribe((data) => {
      alert(data);
      this.getDefaultValues();
    });
  }
  //actual code ends here
}
