import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
//import { FileUploadComponent } from "../../CompanyPortal/shared/file-upload/file-upload.component";
//import { JobOfferListComponent } from "../../CompanyPortal/shared/job-offer-list/job-offer-list.component";

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule, } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, Subscribable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../../../services/company.service';

import { AuthService } from '../../../services/auth.service';
import { Apipaths } from '../../../services/apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';



interface requestOTP {
  email: string | null | undefined;
}

interface verifyOTP {
  email: string | null | undefined;
  otp: string | null | undefined;
}

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FlexLayoutServerModule, MatCardModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  remainingTime = 0;
  reqOTPbtntxt = "Request OTP";
  isFormVerified: boolean = false;


  //form group for the stepper
  companyReg = this._formBuilder.group({
    company_name: ['', Validators.required],
    company_website: [''],
    company_email: ['', [Validators.required, Validators.email]],
    company_description:[''],
    company_logo:[''],
    business_scale: ['', Validators.required],
    business_reg_certificate: [''],
    company_applied_date: ['', Validators.required],
    certificate_of_incorporation: [''],
    company_phone_number: ['', Validators.required],
    business_reg_no: ['', Validators.required],
    otp_in: ['', Validators.required]
  });

  constructor(private snackbar: MatSnackBar, private auth: AuthService, private company: CompanyService, private _formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    // Watch for form validity changes
    this.companyReg.statusChanges.subscribe(status => {
      if (this.isEmailVerified) {
        this.isFormVerified = status === 'VALID';
      }
    });
  }


  async requestOTP() {

    const userData: requestOTP = {
      email: this.companyReg.get('company_email')?.value
    }

    let verificationResult = await this.auth.requestOTP(userData)

    if (verificationResult == true) {
      this.snackbar.open("OTP Sent successful", "")._dismissAfter(3000);
      this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open("OTP Request failed Please try Again", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }


  async VerifyOTP() {
    console.log(this.companyReg.get('otp_in')?.value);

    const userData: verifyOTP = {
      email: this.companyReg.get('company_email')?.value,
      otp: this.companyReg.get('otp_in')?.value
    }

    let verificationResult = await this.auth.verifyOTP(userData);

    if (verificationResult == true) {
      this.isEmailVerified = true;
      this.snackbar.open("OTP verification successful", "", { duration: 2000 });
    } else {
      this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

  }

  async printTextAfterFiveMinutes() {

    this.isOTPRequestSent = true;
    this.remainingTime = 5 * 60; // Initialize remaining time in seconds
    this.reqOTPbtntxt = this.remainingTime.toString();

    const intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(intervalId); // Stop the timer when time is up
        console.log("Timer off");
        this.isOTPRequestSent = false;
        this.reqOTPbtntxt = "Request OTP";
      }
    }, 1000); // Update every second
  }


  onRegister() {
    if (!this.isEmailVerified) {
      alert("Please verify your email first");
      return;
    } else {
      this.company.CompanyRegister(this.companyReg.value);
    }
  }
}