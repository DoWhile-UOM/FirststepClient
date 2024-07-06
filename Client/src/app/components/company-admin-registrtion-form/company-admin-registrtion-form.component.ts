import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmailVerificationBoxComponent } from '../email-verification-box/email-verification-box.component';

import { MatAutocompleteModule, } from '@angular/material/autocomplete';
import { EventEmitter, Output } from '@angular/core';

interface CmpAdminReg {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_registration_url: string;
}
interface unRegCA {
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  confirmed_password: string;
}
interface requestOTP {
  email: string | null | undefined;
}
interface verifyOTP {
  email: string | null | undefined;
  otp: string | null | undefined;

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
    FlexLayoutServerModule, CommonModule, FormsModule, MatGridListModule, MatDividerModule, MatDialogTitle,
    MatDialogContent,
    MatDialogActions
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

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  remainingTime: number = 0;
  reqOTPbtntxt: string = 'Request OTP';
  isConfrimedToChangeEmail: boolean = false;
  otp: string = '';
  canOpenOtpView: boolean = false;

  unRegCA: unRegCA = {} as unRegCA;
  RegCA: CmpAdminReg = {} as CmpAdminReg;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.cmpID = id; // convert string to integer 10 is base
      }
    });
    this.unRegCA.password_hash = '';
    this.unRegCA.confirmed_password = '';
    this.unRegCA.email = '';
    this.unRegCA.first_name = '';
    this.unRegCA.last_name = '';
  }

  //submiting the form

  async onSubmit(formValue: any) {
    this.RegCA.first_name = this.unRegCA.first_name;
    this.RegCA.last_name = this.unRegCA.last_name;
    this.RegCA.email = this.unRegCA.email;
    this.RegCA.password = this.unRegCA.password_hash;
    this.RegCA.company_registration_url = this.cmpID;

    const IsVaild = this.formValidation();
    if (IsVaild) {
      try {
        this.spinner.show();

        await this.employeeService.postCompanyAdminReg(this.RegCA);
        this.router.navigate(['/login']);

        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
      }
    }
    else {
      this.dialog.open(CannotSubmitWithoutAllTheInputsAreValid);
    }
  }

  formValidation() {
    if (this.unRegCA.first_name.length != 0 && this.unRegCA.last_name.length != 0 && this.unRegCA.email.length != 0 && this.unRegCA.password_hash.length != 0 && this.unRegCA.confirmed_password.length != 0 && this.unRegCA.password_hash == this.unRegCA.confirmed_password && this.isEmailVerified == true) {
      return true;
    } else {
      return false;
    }
  }
  //validations
  validateFirstName() {
    if (this.unRegCA.first_name.length == 0) {
      this.errorMessageForFName = 'First Name is required';
    } else {
      this.errorMessageForFName = '';
    }
  }
  validateLastName() {
    if (this.unRegCA.last_name.length == 0) {
      this.errorMessageForLName = 'Last Name is required';
    } else {
      this.errorMessageForLName = '';
    }
  }
  validatePassword() {
    if (this.unRegCA.password_hash.length == 0) {
      this.errorMessageForPassword = 'Password is required';
    } else {
      this.errorMessageForPassword = '';
    }
  }
  validateConfirmedPassword() {
    if (this.unRegCA.confirmed_password.length == 0 || this.unRegCA.password_hash != this.unRegCA.confirmed_password) {
      this.errorMessageForConfirmedPassword = 'Confirmed Password does not match';
    } else {
      this.errorMessageForConfirmedPassword = '';
    }
  }
  validateEmail() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let test = emailRegex.test(this.unRegCA.email.toString());
    if (this.unRegCA.email == '' || !test) {
      this.errorMessageForEmail = 'Email is required';
    } else {
      this.errorMessageForEmail = '';
      this.confrimedToChangeEmail();
    }
  }

  //OTP handling
  confrimedToChangeEmail() {
    const dialogRef = this.dialog.open(ConfirmToChangeEmail);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.isConfrimedToChangeEmail = true;
        //this.canOpenOtpView = true;
        //this.openEmailVerificationDialog();
        this.openEmailAuthPopupWithEmail();
      }
    }
    );
  }

  //Ashan's pop up
  openEmailVerificationDialog() {
    const emailVerificationDialogRef = this.dialog.open(EmailVerificationBoxComponent, {
      width: '600px', // Set width as needed
      data: { email: this.unRegCA.email } // Pass any data you need for the email verification
    });
    emailVerificationDialogRef.afterClosed().subscribe(result => {
      // Handle the result from the email verification dialog
      console.log('The email verification dialog was closed. Result:', result);
      if (result === true) {
        this.isEmailVerified = true;
      } else {
        // Handle email verification failure or cancellation
      }
    });
  }
  //customized email authentication pop up
  openEmailAuthPopupWithEmail() {
    const email = this.unRegCA.email;
    const emailAuthenticationDialogRef = this.dialog.open(EmailAuthenticationPopUp, {
      width: '600px',
      data: { email: this.unRegCA.email } // Pass email to popup
    });

    emailAuthenticationDialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the email verification dialog
      console.log('The email verification dialog was closed. Result:', result.verified);
      if (result.verified == true) {
        console.log(this.isEmailVerified);
        this.isEmailVerified = true;
        console.log(this.isEmailVerified);
      } else {
        // Handle email verification failure or cancellation
      }
    });
  }

  async requestOTP() {
    const userData: requestOTP = {
      email: this.unRegCA.email,
    };
    let verificationResult = await this.auth.requestOTP(userData);
    if (verificationResult) {
      this.snackbar.open('OTP Sent successful', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
      this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open('OTP Sent failed', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    }
  }

  async VerifyOTP() {
    const userData: verifyOTP = {
      email: this.unRegCA.email,
      otp: this.otp
    };
    let verificationResult = await this.auth.verifyOTP(userData);
    if (verificationResult) {
      this.isEmailVerified = true;
      this.canOpenOtpView = false;
      this.snackbar.open('OTP Verified successful', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);

    } else {
      this.snackbar.open('OTP Verified failed', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    }
  }

  printTextAfterFiveMinutes() {
    this.isOTPRequestSent = true;
    this.remainingTime = 300;//60*5
    this.reqOTPbtntxt = this.remainingTime.toString();
    const intervalId = setInterval(() => {
      this.remainingTime--;
      this.cdr.detectChanges();
      if (this.remainingTime <= 0) {
        clearInterval(intervalId); // Stop the timer when time is up
        this.isOTPRequestSent = false;
        this.reqOTPbtntxt = "Request OTP";
      }
    }, 1000);
  }

}

//cannot-submit-without-filling-all-fields
@Component({
  selector: 'cannot-submit-without-all-the-inputs-are-valid',
  standalone: true,
  templateUrl: 'cannot-submit-without-all-the-inputs-are-valid.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class CannotSubmitWithoutAllTheInputsAreValid {
}

//confirmToChangeEmail
@Component({
  selector: 'confirmTChangeEmail-pop-up',
  standalone: true,
  templateUrl: 'confirmTChangeEmail-pop-up.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class ConfirmToChangeEmail {
  constructor(public dialogRef: MatDialogRef<ConfirmToChangeEmail>) { }
  okAction() {
    this.dialogRef.close(true);
  }
}

//email-authentication-pop-up
@Component({
  selector: 'email-authentication-pop-up',
  standalone: true,
  styleUrl: './company-admin-registrtion-form.component.css',
  templateUrl: 'email-authentication-pop-up.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    CommonModule, FlexLayoutServerModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatDividerModule, MatCardModule, MatAutocompleteModule
  ],
})
export class EmailAuthenticationPopUp {
  requestBtnstate: boolean = false;
  verifyBtnstate: boolean = true;
  rmnTime: number = 60;
  interval: any;
  useremailAddress: string = '';
  CAReg = this._formBuilder.group({
    ca_email: ['', [Validators.required, Validators.email]],//
    otp_in: ['', Validators.required]
  });
  @Output() otpVerified: EventEmitter<boolean> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<EmailAuthenticationPopUp>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private snackbar: MatSnackBar, private auth: AuthService) { }
  ngOnInit() {
    this.useremailAddress = this.data.email;
    this.checkButtonStatus();
  }

  async requestOTP() {

    const userData: requestOTP = {
      email: this.CAReg.get('ca_email')?.value
    }

    if (!this.isValidEmail(userData)) {
      this.snackbar.open("Please Enter the Email Address", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return;
    }
    this.requestBtnstate = true;

    let verificationResult = await this.auth.requestOTP(userData)

    if (verificationResult == true) {
      this.snackbar.open("OTP Sent successful", "")._dismissAfter(3000);
      this.handleClick();
      this.verifyBtnstate = false;
      //this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open("OTP Request failed Please try Again", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      this.requestBtnstate = false;
      return;
    }
  }

  async VerifyOTP() {
    console.log(this.CAReg.get('otp_in')?.value);

    const userData: verifyOTP = {
      email: this.CAReg.get('ca_email')?.value,
      otp: this.CAReg.get('otp_in')?.value
    }

    let verificationResult = await this.auth.verifyOTP(userData);

    if (verificationResult == true) {
      //this.isEmailVerified = true;
      this.snackbar.open("OTP verification successful", "", { duration: 2000 });
      this.requestBtnstate = true;
      this.verifyBtnstate = true;
      this.closeDialog();
    } else {
      this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

  }
  isValidEmail(userData: requestOTP): boolean {
    const email = userData.email || "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
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
    if (this.isBrowser()) {
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

  closeDialog(): void {
    const additionalData = {
      emailAddress: this.useremailAddress,
      verified: true // Example boolean value
    };
    this.dialogRef.close(additionalData);
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}