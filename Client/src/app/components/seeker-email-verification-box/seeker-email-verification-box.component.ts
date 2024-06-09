import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface requestOTP {
  email: string | null | undefined;
}

interface verifyOTP {
  email: string | null | undefined;
  otp: string | null | undefined;
}

@Component({
  selector: 'app-seeker-email-verification-box',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatIconModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './seeker-email-verification-box.component.html',
  styleUrl: './seeker-email-verification-box.component.css',
})
export class SeekerEmailVerificationBoxComponent implements OnDestroy{
  requestBtnstate: boolean = false;
  verifyBtnstate: boolean = true;
  rmnTime: number = 60;
  interval: any;
  useremailAddress: string = '';

  //form group for the stepper
  seekerForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    otp_in: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<SeekerEmailVerificationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private _formBuilder: FormBuilder
  ) {}
  

  async requestOTP() {

    const userData: requestOTP = {
      email: this.seekerForm.get('company_email')?.value
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
    console.log(this.seekerForm.get('otp_in')?.value);

    const userData: verifyOTP = {
      email: this.seekerForm.get('company_email')?.value,
      otp: this.seekerForm.get('otp_in')?.value
    }

    let verificationResult = await this.auth.verifyOTP(userData);

    if (verificationResult == true) {
      //this.isEmailVerified = true;
      this.snackbar.open("OTP verification successful", "", { duration: 2000 });
      this.requestBtnstate= true;
      this.verifyBtnstate= true;
      this.closeDialog();
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





  // ngOnInit(): void {
  //   this.useremailAddress = this.data.email;
  //   this.sendOTP();
  // }

  // ngOnDestroy(): void {
  //   clearInterval(this.interval);
  // }

  // sendOTP() {
  //   this.requestBtnstate = true;
  //   this.verifyBtnstate = false;
  //   this.interval = setInterval(() => {
  //     if (this.rmnTime > 0) {
  //       this.rmnTime--;
  //     } else {
  //       this.requestBtnstate = false;
  //       this.verifyBtnstate = true;
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  //   const request: requestOTP = {
  //     email: this.useremailAddress,
  //   };
  //   this.auth.requestOTP(request).subscribe((response) => {
  //     if (response) {
  //       this.snackbar.open('OTP Sent', 'Close', {
  //         duration: 2000,
  //       });
  //     }
  //   });
  // }

  // verifyOTP() {
  //   const verify: verifyOTP = {
  //     email: this.useremailAddress,
  //     otp: this.companyReg.get('otp_in')?.value,
  //   };
  //   this.auth.verifyOTP(verify).subscribe((response) => {
  //     if (response) {
  //       this.snackbar.open('Email Verified', 'Close', {
  //         duration: 2000,
  //       });
  //       this.dialogRef.close(true);
  //     }
  //   });
  // }
}
