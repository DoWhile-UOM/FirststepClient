import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

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
    MatDividerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './seeker-email-verification-box.component.html',
  styleUrls: ['./seeker-email-verification-box.component.css'],
})
export class SeekerEmailVerificationBoxComponent implements OnDestroy, OnInit {
  requestBtnstate: boolean = false;
  verifyBtnstate: boolean = true;
  rmnTime: number = 60;
  interval: any;
  useremailAddress: string = '';

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

  ngOnInit(): void {
    this.useremailAddress = this.data.email;
    this.seekerForm.get('email')?.setValue(this.useremailAddress);
  }

  async requestOTP() {
    const userData: requestOTP = {
      email: this.seekerForm.get('email')?.value,
    };

    if (!this.isValidEmail(userData)) {
      this.snackbar.open('Please Enter the Email Address', '', {
        panelClass: ['app-notification-error'],
      })._dismissAfter(3000);
      return;
    }
    this.requestBtnstate = true;

    let verificationResult = await this.auth.requestOTP(userData);

    if (verificationResult == true) {
      this.snackbar.open('OTP Sent successful', '')._dismissAfter(3000);
      this.handleClick();
      this.verifyBtnstate = false;
    } else {
      this.snackbar.open('OTP Request failed. Please try Again', '', {
        panelClass: ['app-notification-error'],
      })._dismissAfter(3000);
      this.requestBtnstate = false;
      return;
    }
  }

  async VerifyOTP() {
    const userData: verifyOTP = {
      email: this.seekerForm.get('email')?.value,
      otp: this.seekerForm.get('otp_in')?.value,
    };

    if (!userData.email) {
      this.snackbar.open('Please enter your email address', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
      return;
    }

    console.log('Verifying OTP with data:', userData);

    const verificationResult = await this.auth.verifyOTP(userData);

    if (verificationResult == true) {
      this.snackbar.open('OTP verification successful', '', { duration: 2000 });
      this.requestBtnstate = true;
      this.verifyBtnstate = true;
      this.closeDialog();
    } else {
      this.snackbar.open('OTP verification failed', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
    }
  }

  isValidEmail(userData: requestOTP): boolean {
    const email = userData.email || '';
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
      emailAddress: this.seekerForm.get('email')?.value,
      verified: true,
    };
    this.dialogRef.close(additionalData);
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
