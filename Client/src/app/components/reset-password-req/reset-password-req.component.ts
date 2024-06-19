import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@syncfusion/ej2-angular-pdfviewer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-reset-password-req',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, FlexLayoutServerModule, SpinnerComponent],
  templateUrl: './reset-password-req.component.html',
  styleUrl: './reset-password-req.component.css'
})
export class ResetPasswordReqComponent {
  requestButton = false;

  requestBtnstate: boolean = false;
  rmnTime: number = 60;
  interval: any;

  constructor(private router: Router, private auth: AuthService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkButtonStatus();
  }



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  async onLogin() {
    //console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.requestButton = true;
    //this.spinner.show();
    if (!this.loginForm.value.email) {
      this.snackBar.open("Please Enter the Email", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      this.requestButton = false;
      return;
    }
    this.handleClick();
    //this.auth.ResetPasswordReq(this.loginForm.value.email);
    await this.auth.ResetPasswordReqNew(this.loginForm.value.email)
    //this.requestButton=false;
    //this.spinner.hide();
  }

  //OTP Button New fucntion
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  handleClick(): void {

    const currentTime = Date.now();
    const unlockTime = currentTime + 60000; // 60 seconds later

    localStorage.setItem('unlockTimePass', unlockTime.toString());
    this.requestBtnstate = true;
    this.startCountdown();
  }

  checkButtonStatus(): void {
    if (this.isBrowser()) {
      const unlockTime = localStorage.getItem('unlockTimePass');

      if (unlockTime) {
        const currentTime = Date.now();
        const timeDifference = parseInt(unlockTime) - currentTime;

        if (timeDifference > 0) {
          this.requestBtnstate = true;
          this.rmnTime = Math.ceil(timeDifference / 1000);
          this.startCountdown();
        } else {
          localStorage.removeItem('unlockTimePass');
        }
      }
    }
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      this.rmnTime--;

      if (this.rmnTime <= 0) {
        this.requestBtnstate = false;
        localStorage.removeItem('unlockTimePass');
        clearInterval(this.interval);
      }
    }, 1000);
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }




}
