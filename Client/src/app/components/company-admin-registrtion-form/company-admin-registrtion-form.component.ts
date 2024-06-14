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


interface CmpAdminReg {
  email: string;
  password: string;
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
interface requestOTP {
  email: string;
}
interface verifyOTP {
  email: string;
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

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private spinner: NgxSpinnerService, public dialog: MatDialog, private snackbar: MatSnackBar, private auth: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.cmpID = id; // convert string to integer 10 is base
        console.log('Company ID:', this.cmpID);
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
    console.log(this.RegCA);
    console.log(this.cmpID);
    const IsVaild = this.formValidation();
    if (IsVaild) {
      try {
        this.spinner.show();
        console.log('Company Admin Registration Started');
        await this.employeeService.postCompanyAdminReg(this.RegCA, this.cmpID);
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
    console.log(this.errorMessageForFName);
  }
  validateLastName() {
    if (this.unRegCA.last_name.length == 0) {
      this.errorMessageForLName = 'Last Name is required';
    } else {
      this.errorMessageForLName = '';
    }
    console.log(this.errorMessageForLName);
  }
  validatePassword() {
    if (this.unRegCA.password_hash.length == 0) {
      this.errorMessageForPassword = 'Password is required';
    } else {
      this.errorMessageForPassword = '';
    }
    console.log(this.errorMessageForPassword);
  }
  validateConfirmedPassword() {

    if (this.unRegCA.confirmed_password.length == 0 || this.unRegCA.password_hash != this.unRegCA.confirmed_password) {
      this.errorMessageForConfirmedPassword = 'Confirmed Password does not match';
    } else {
      this.errorMessageForConfirmedPassword = '';
    }
    console.log(this.errorMessageForConfirmedPassword);
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
        this.canOpenOtpView = true;
        console.log('Email is confirmed to change');
        console.log(this.isConfrimedToChangeEmail);
      }
    }
    );
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
        console.log("Timer off");
        this.isOTPRequestSent = false;
        this.reqOTPbtntxt = "Request OTP";
      }
      console.log(this.remainingTime);
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