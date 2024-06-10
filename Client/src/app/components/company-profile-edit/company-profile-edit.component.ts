import { Component, OnInit } from '@angular/core';
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
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../../../services/document.service';

import { ChangeDetectorRef } from '@angular/core';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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

interface requestOTP {
  email: string;
}
interface verifyOTP {
  email: string;
  otp: string | null | undefined;
}

@Component({
  selector: 'app-company-profile-edit',
  standalone: true,
  templateUrl: './company-profile-edit.component.html',
  styleUrl: './company-profile-edit.component.css',
  imports: [
    MatGridListModule,
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
    MatCardModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions, MatProgressSpinnerModule,
  ],
})
export class CompanyProfileEditComponent {
  hasDataLoaded: boolean = false;

  emailcaptuered = '';
  selected = 'company.company_business_scale';
  email = new FormControl('', [Validators.required, Validators.email]);
  company: Company = {} as Company; // Initialize the company property
  cName = ''; // to store Comapny Name that is on the top
  noOfCols: number = 2;
  companyId: number = 7; // temp
  BusinessScales: any[] = [];

  errorMessageForCompanyName = '';
  errorMessageForDescription = '';
  errorMessageForWebsite = '';
  errorMessageForPhoneNumber = '';
  errorMessageForEmail = '';

  isOTPRequestSent: boolean = false;
  remainingTime: number = 0;
  reqOTPbtntxt: string = 'Request OTP';
  isFormVerified: boolean = false;
  isConfrimedToChangeEmail: boolean = false;
  otp: string = '';

  logoUrl = '';
  logoBlobName = '';
  selectedFile: File | null = null;
  eventOccured: boolean = false;
  //commayForm
  companyForm!: FormGroup;
  constructor(
    private companyService: CompanyService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef) {
    this.BusinessScales = CompanyService.BusinessScales;
  }

  async ngOnInit() {
    try {
      this.spinner.show();
      this.company = await this.companyService.getCompanyDetails(
        this.companyId
      );
      this.cName = this.company.company_name;
      this.emailcaptuered = this.company.company_email;
      this.hasDataLoaded = true;

      this.logoUrl = this.company.company_logo;
      console.log(this.logoUrl);
      this.spinner.hide();
    } catch (error) {
      console.log(error);
      this.spinner.hide();
    }
  }

  //image upload
  onselectFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.logoUrl = (e.target?.result as string) || '';
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.eventOccured = true;
  }
  async onSaveLogo() {
    if (this.selectedFile) {
      await this.companyService.updateCompanyLogo(this.selectedFile, this.companyId)
        .then(response => {
          console.log('Upload successful', response);
        })
        .catch(error => {
          console.error('Upload error', error);
        });
    } else {
      console.error('No file selected!');
    }
    this.eventOccured = false;
  }

  async onSubmit() {
    console.log("onSubmit function is called");
    try {
      if (
        this.errorMessageForCompanyName == '' &&
        this.errorMessageForDescription == '' &&
        this.errorMessageForWebsite == '' &&
        this.errorMessageForPhoneNumber == '' &&
        this.errorMessageForEmail == '' && (this.emailcaptuered == this.company.company_email)

      ) {
        console.log('Company : ', this.company);
        this.spinner.show();
        console.log(this.company);
        await this.companyService.updateCompanyDetails(
          this.company,
          this.companyId
        ); // 7 for bistec
        this.cName = this.company.company_name;
        console.log('updated');
      }
      else if (!(this.emailcaptuered == this.company.company_email)) {
        this.dialog.open(InformEmailShouldBeVerifiedPopUp);
      }
      else {
        this.dialog.open(CannotSubmitWithoutAllInputsAreValidPopUp);
      }
    } finally {
      this.spinner.hide();
    }
  }

  async discardChanges() {
    this.company = {} as Company;
    this.company = await this.companyService.getCompanyDetails(this.companyId);
    console.log('discarded changes');
  }

  async deleteAccount() {
    try {
      this.spinner.show();
      await this.companyService.deleteAccount(this.companyId);
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
    let phoneNumberRegex = /^[0-9]{10}$/;
    let testResult = phoneNumberRegex.test(this.company.company_phone_number.toString());
    if (this.company.company_phone_number.toString().length == 0) {
      console.log('should print required');
      this.errorMessageForPhoneNumber = 'Phone number is required';
    } else if (testResult == false) {
      console.log('should print invalid');
      this.errorMessageForPhoneNumber = 'Phone number is invalid';
    } else {
      console.log('should print empty');
      this.errorMessageForPhoneNumber = '';
    }
  }
  emailErrorMessage() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let testResult = emailRegex.test(this.company.company_email.toString());
    if (this.company.company_email.length == 0) {
      this.errorMessageForEmail = 'Email is required.';
    } else if (testResult == false) {
      console.log('should print ivalid');
      this.errorMessageForEmail = 'Email is invalid.';
      console.log(this.errorMessageForEmail);
    } else {
      console.log('should print empty');
      this.errorMessageForEmail = '';
      this.confirmTOChangeEmail();
    }
    console.log(this.errorMessageForEmail);
  }
  //OTP handling
  confirmTOChangeEmail() {
    const dialogRef = this.dialog.open(ApprovingChangingEmailPopUp);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.isConfrimedToChangeEmail = true;
        console.log(this.isConfrimedToChangeEmail);
      }
    });
  }



  async requestOTP() {

    const userData: requestOTP = {
      email: this.company.company_email,
    };
    let verificationResult = await this.auth.requestOTP(userData);
    console.log('otp request sent');
    console.log(verificationResult);
    if (verificationResult == true) {
      this.snackbar.open('OTP Sent successful', '')._dismissAfter(3000);
      this.printTextAfterFiveMinutes();
      console.log('otp sent');
    } else {
      this.snackbar
        .open('OTP Request failed Please try Again', '', {
          panelClass: ['app-notification-error'],
        })
        ._dismissAfter(3000);
    }
  }
  async VerifyOTP() {
    console.log(this.company.company_email);
    const userData: verifyOTP = {
      email: this.company.company_email,
      otp: this.otp,
    };
    let verificationResult = await this.auth.verifyOTP(userData);
    console.log(userData);
    console.log('otp verification request was sent');
    if (verificationResult == true) {
      // this.isEmailVerified = true;
      this.emailcaptuered = this.company.company_email;
      this.snackbar.open('OTP verification successful', '', { duration: 2000 });
      console.log('otp verified');
    } else {
      this.snackbar
        .open('OTP verification failed', '', {
          panelClass: ['app-notification-error'],
        })
        ._dismissAfter(3000);
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

//cannot-submit-without-all-inputs-are-valid-pop-up
@Component({
  selector: 'cannot-submit-without-all-inputs-are-valid-pop-up',
  standalone: true,
  templateUrl: 'cannot-submit-without-all-inputs-are-valid-pop-up.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class CannotSubmitWithoutAllInputsAreValidPopUp { }

//approving-changing0email-pop-up
@Component({
  selector: 'approvaing-changing-email-pop-up',
  standalone: true,
  templateUrl: 'approvaing-changing-email-pop-up.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class ApprovingChangingEmailPopUp {
  givenPermissionToChangeEmail: boolean = false;
  constructor(public dialogRef: MatDialogRef<ApprovingChangingEmailPopUp>) { }

  closeDialog() {
    this.dialogRef.close(this.givenPermissionToChangeEmail);
  }
  yesAction() {
    this.givenPermissionToChangeEmail = true;
    this.dialogRef.close(this.givenPermissionToChangeEmail);
  }
}

//inform-email-should-be-verified-pop-up
@Component({
  selector: 'inform-email-should-be-verified-pop-up',
  standalone: true,
  templateUrl: 'inform-email-should-be-verified-pop-up.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class InformEmailShouldBeVerifiedPopUp { }