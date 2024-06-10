import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
interface CmpAdminReg {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}
interface unRegCA {
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  confirmed_password: string;
}

@Component({
  selector: 'app-company-admin-registrtion-form',
  standalone: true,
  templateUrl: './company-admin-registrtion-form.component.html',
  styleUrl: './company-admin-registrtion-form.component.css',
  imports: [
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutServerModule, CommonModule, FormsModule, MatGridListModule, MatDividerModule
  ],
})
export class CompanyAdminRegistrtionFormComponent {
  hide = true;
  cmpID: string = '';
  type: string = 'CA';
  errorMessageForFName = '';
  errorMessageForLName = '';
  errorMessageForPassword = '';
  errorMessageForConfirmedPassword = '';
  errorMessageForEmail = '';
  unRegCA: unRegCA = {} as unRegCA;



  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.cmpID = id; // convert string to integer 10 is base
        console.log('Company ID:', this.cmpID);
      }
    });
  }

  async onSubmit(formValue: any) {
    const adminRegData: CmpAdminReg = {
      email: formValue.email,
      password_hash: formValue.password,
      first_name: formValue.firstName,
      last_name: formValue.lastName,

    };

    try {
      console.log('Company Admin Registration Started');
      await this.companyService.postCompanyAdminReg(adminRegData, this.type, this.cmpID);
      console.log('Company Admin Registration Successful');
    } catch (error) {
      console.error(error);
    }
  }

  formValidation(adminRegData: CmpAdminReg) {
    this.validateFirstName(adminRegData.first_name);
    this.validateLastName(adminRegData.last_name);
    this.validatePassword(adminRegData.password_hash);
    this.validateConfirmedPassword(adminRegData.password_hash);
    this.validateEmail(adminRegData.email);
  }

  validateFirstName(value: string) {
    if (value === '') {
      this.errorMessageForFName = 'First Name is required';
    } else {
      this.errorMessageForFName = '';
    }
  }
  validateLastName(value: string) {
    if (value === '') {
      this.errorMessageForLName = 'Last Name is required';
    } else {
      this.errorMessageForLName = '';
    }
  }
  validatePassword(value: string) {
    if (value === '') {
      this.errorMessageForPassword = 'Password is required';
    } else {
      this.errorMessageForPassword = '';
    }
  }
  validateConfirmedPassword(pass: string) {
    // Assuming the confirmed password input has an id 'confirmPassword'
    const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement;
    const comfirmPass = confirmPasswordElement ? confirmPasswordElement.value : '';

    if (comfirmPass === '' || comfirmPass !== pass) {
      this.errorMessageForConfirmedPassword = 'Confirmed Password does not match';
    } else {
      this.errorMessageForConfirmedPassword = '';
    }
  }
  validateEmail(value: string) {
    if (value === '') {
      this.errorMessageForEmail = 'Email is required';
    } else {
      this.errorMessageForEmail = '';
    }
  }

}
