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
  MatDialogClose,MAT_DIALOG_DATA,
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
import { ChangeDetectorRef } from '@angular/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeekerService } from '../../../services/seeker.service';

interface job_Field {
  field_name: string;
  field_id: number;
}

interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: any;
  user_id: number;
  password_hash: string;
  job_Field: any;
  job_field_name: string;
  seekerSkills: string[];
}

interface updateSeeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  password: string;
  seekerSkills: string[];
}

interface requestOTP {
  email: string ;
}
interface verifyOTP {
  email: string ;
  otp: string | null | undefined;
}

@Component({
  selector: 'app-seeker-profile-edit',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, TextFieldModule, MatSelectModule, MatIconModule, ReactiveFormsModule, FormsModule, MatDividerModule, MatButtonModule, MatCardModule, MatGridListModule, CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, NgxSpinnerModule, SpinnerComponent,],
  templateUrl: './seeker-profile-edit.component.html',
  styleUrl: './seeker-profile-edit.component.css'
})
export class SeekerProfileEditComponent {

  hasDataLoaded: boolean = false;
  emailcaptured = '';
  selected = 'seeker.field_id';
  seekerName= '';
  noOfCols: number = 2;
  user_id: number = 2095;//temp
  seeker:Seeker = {} as Seeker; // Initialize seeker object
  Fields:any[] = [];


  job_fields: job_Field[] = [];
  seekerSkills: string[] = [];
  selectedSkills: string[] = [];



  errorMessageForSeekerName = '';
  errorMessageForEmail = '';
  errorMessageForPhoneNumber = '';
  errorMessageForBio = '';
  errorMessageForDescription = '';
  errorMessageForUniversity = '';
  errorMessageForCVurl = '';
  errorMessageForProfilePicture = '';
  errorMessageForLinkedin = '';
  errorMessageForField = '';
  errorMessageForPassword = '';
  errorMessageForSeekerSkills = '';

  isOTPRequestSent: boolean = false;
  remainingTime: number = 0;
  reqOTPbtntxt: string = 'Request OTP';
  isFormVerified: boolean = false;
  isConfrimedToChangeEmail: boolean = false;
  otp: string = '';

  constructor(private seekerService: SeekerService, private spinner: NgxSpinnerService, private authService: AuthService, private snackBar: MatSnackBar, private cd: ChangeDetectorRef, private dialog: MatDialog,private auth:AuthService,private snackbar: MatSnackBar) { }

  async ngOnInit() {
    try{
      this.spinner.show();
      this.seeker = await this.seekerService.getSeekerDetails(this.authService.getUserId());
      // this.job_fields = await this.seekerService.getJobFields();
      console.log("Seeker: ", this.seeker);
      this.hasDataLoaded = true;
      this.spinner.hide();
    } catch (error) {
      console.error(error);
      this.spinner.hide();
    }
  }

  async onSubmit() {
    console.log("onSubmit function is called");
    try {
      if (
        this.errorMessageForSeekerName == '' &&
        this.errorMessageForEmail == '' &&
        this.errorMessageForPhoneNumber == '' &&
        this.errorMessageForBio == '' &&
        this.errorMessageForDescription == '' &&
        this.errorMessageForUniversity == '' &&
        this.errorMessageForField == '' &&
        this.errorMessageForPassword == '' 
        // && this.errorMessageForSeekerSkills == ''
      ) {
        console.log('Seeker: ', this.seeker);
        this.spinner.show();
        console.log(this.seeker);
        // this.seeker.field_id = this.selected;
        // this.seeker.seekerSkills = this.selectedSkills;
        console.log("Seeker: ", this.seeker);
        await this.seekerService.editseeker(this.seeker, this.user_id);
        this.spinner.hide();
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 2000,
        });
      }else if(!(this.emailcaptured==this.seeker.email)){
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
    this.seeker = {} as Seeker;
    this.seeker = await this.seekerService.getSeekerDetails(this.user_id);
    console.log('discarded changes');
  }

  async deleteAccount() {
    try {
      this.spinner.show();
      await this.seekerService.deleteseeker(this.user_id);
      console.log('deleted');
    } finally {
      this.spinner.hide();
    }
  }



  //errorMessages
  seekerNameErrorMessage() { //last name should be checked too
    if (this.seeker.first_name.length == 0) {
      this.errorMessageForSeekerName = 'First name is required';
    } else {
      this.errorMessageForSeekerName = '';
    }
  }

  descriptionErrorMessage() {
    if (this.seeker.description.length == 0) {
      this.errorMessageForDescription = 'Description is required';
    } else {
      this.errorMessageForDescription = '';
    }
  }

  bioErrorMessage() {
    if (this.seeker.bio.length == 0) {
      this.errorMessageForBio = 'Bio is required';
    } else {
      this.errorMessageForBio = '';
    }
  }

  phoneNumberErrorMessage() {
    let phoneNumberRegex = /^[0-9]{10}$/;
    let testResult = phoneNumberRegex.test(this.seeker.phone_number.toString());
    if (this.seeker.phone_number.toString().length == 0) { 
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

  universityErrorMessage() {
    if (this.seeker.university.length == 0) {
      this.errorMessageForUniversity = 'University is required';
    } else {
      this.errorMessageForUniversity = '';
    }
  }

  // CVurlErrorMessage() {
  //   if (this.seeker.cVurl.length == 0) {
  //     this.errorMessageForCVurl = 'CV url is required';
  //   } else {
  //     this.errorMessageForCVurl = '';
  //   }
  // }

  // profilePictureErrorMessage() {
  //   if (this.seeker.profile_picture.length == 0) {
  //     this.errorMessageForProfilePicture = 'Profile picture is required';
  //   } else {
  //     this.errorMessageForProfilePicture = '';
  //   }
  // }

  fieldErrorMessage() {
    if (this.seeker.field_id == 0) {
      this.errorMessageForField = 'Field is required';
    } else {
      this.errorMessageForField = '';
    }
  }

  passwordErrorMessage() {
    if (this.seeker.password_hash.length == 0) {
      this.errorMessageForPassword = 'Password is required';
    } else {
      this.errorMessageForPassword = '';
    }
  }

  emailErrorMessage() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let testResult = emailRegex.test(this.seeker.email.toString());
    if (this.seeker.email.length == 0) {
      this.errorMessageForEmail = 'Email is required.';
    } else if (testResult == false) {
      console.log('should print ivalid');
      this.errorMessageForEmail = 'Email is invalid.';
      console.log(this.errorMessageForEmail);
    } else {
      console.log('should print empty');
      this.errorMessageForEmail = '';
      this.confirmToChangeEmail();
    }
    console.log(this.errorMessageForEmail);
  }

  //OTP handling
  confirmToChangeEmail(){
    const dialogRef = this.dialog.open(ApprovingChangingEmailPopUp);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.isConfrimedToChangeEmail=true;
        console.log(this.isConfrimedToChangeEmail);
        }
    });
  }


  async requestOTP() {
  
    const userData: requestOTP = {
      email: this.seeker.email,
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
console.log(this.seeker.email);
const userData: verifyOTP = {
  email: this.seeker.email,
  otp: this.otp,
};
let verificationResult = await this.auth.verifyOTP(userData);
console.log(userData);
console.log('otp verification request was sent');
if (verificationResult == true) {
  // this.isEmailVerified = true;
  this.emailcaptured=this.seeker.email;
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

printTextAfterFiveMinutes(){
this.isOTPRequestSent = true;
this.remainingTime = 300;//60*5
this.reqOTPbtntxt = this.remainingTime.toString();
const intervalId = setInterval(() => {
  this.remainingTime--;
  // this.cdr.detectChanges();
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
export class CannotSubmitWithoutAllInputsAreValidPopUp {}

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
constructor(public dialogRef: MatDialogRef<ApprovingChangingEmailPopUp>) {}

closeDialog() {
this.dialogRef.close(this.givenPermissionToChangeEmail);
}
yesAction(){
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
export class InformEmailShouldBeVerifiedPopUp{}


