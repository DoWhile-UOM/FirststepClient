import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-email-verification-box',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FlexLayoutServerModule, MatCardModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule],
  templateUrl: './email-verification-box.component.html',
  styleUrl: './email-verification-box.component.css'
})
export class EmailVerificationBoxComponent implements OnInit, OnDestroy{

  requestBtnstate:boolean = false;
  verifyBtnstate:boolean = true;
  rmnTime: number = 60;
  interval: any;


  //form group for the stepper
  companyReg = this._formBuilder.group({
    company_email: ['', [Validators.required, Validators.email]],//
    otp_in: ['', Validators.required]
  });

  constructor(private snackbar: MatSnackBar, private auth: AuthService, private company: CompanyService, private _formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.checkButtonStatus();
  }


  async requestOTP() {

    const userData: requestOTP = {
      email: this.companyReg.get('company_email')?.value
    }

    if (!this.isValidEmail(userData)) {
      this.snackbar.open("Please Enter the Email Address", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return;
    }
    this.requestBtnstate=true;

    let verificationResult = await this.auth.requestOTP(userData)

    if (verificationResult == true) {
      this.snackbar.open("OTP Sent successful", "")._dismissAfter(3000);
      this.handleClick();
      this.verifyBtnstate=false;
      //this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open("OTP Request failed Please try Again", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      this.requestBtnstate=false;
      return;
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
      //this.isEmailVerified = true;
      this.snackbar.open("OTP verification successful", "", { duration: 2000 });
      this.requestBtnstate= true;
      this.verifyBtnstate= true;
    } else {
      this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

  }


  isValidEmail(userData:requestOTP): boolean {
    const email = userData.email||"";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  //OTP Button New fucntion
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  handleClick(): void {
    
    const currentTime = Date.now();
    const unlockTime = currentTime + 60000; // 60 seconds later

    localStorage.setItem('unlockTime', unlockTime.toString());
    this.requestBtnstate = true;
    this.startCountdown();
  }

  checkButtonStatus(): void {
    if(this.isBrowser()) {
      const unlockTime = localStorage.getItem('unlockTime');

      if (unlockTime) {
        const currentTime = Date.now();
        const timeDifference = parseInt(unlockTime) - currentTime;
  
        if (timeDifference > 0) {
          this.requestBtnstate = true;
          this.rmnTime = Math.ceil(timeDifference / 1000);
          this.startCountdown();
        } else {
          localStorage.removeItem('unlockTime');
        }
      }
    }
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      this.rmnTime--;

      if (this.rmnTime <= 0) {
        this.requestBtnstate = false;
        localStorage.removeItem('unlockTime');
        clearInterval(this.interval);
      }
    }, 1000);
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

}
