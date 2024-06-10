import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@syncfusion/ej2-angular-pdfviewer';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatIcon,MatLabel,MatFormField,ReactiveFormsModule,FormsModule,MatCardModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  hide = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar){

  }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email])
  });

  onLogin(){
    //console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.spinner.show();

    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        //this.auth.storeToken(res.token)

        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        this.snackBar.open("Login Error! Error Code " + err.status, "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
      }
    });

    this.spinner.hide();
  
}}
