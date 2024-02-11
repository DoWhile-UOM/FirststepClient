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
    this.http
      .get<Company>(this.APIURL + 'GetCompanyDetails')
      .subscribe((data) => {
        const company: Company = data;
      });
  }

  ngOnInit(): void {
    this.getDefaultValues(); // sample company_id
  }

  [x: string]: any;
  emp_role: string = 'Non';
  onRoleCreate(company: Company) {
    company.company_id = 8; // sample company_id
    console.log(company);
    this.http
      .put(this.APIURL + 'UpdateCompanyDetails', company)
      .subscribe((res: any) => {});
  }
  //actual code ends here
}
