import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserStoreService } from '../../../services/user-store.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, FlexLayoutServerModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userStore: UserStoreService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar){
  }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email])
  });

  async onLogin(){
    this.spinner.show();

    (await this.auth.login(this.loginForm.value))
    .subscribe({
      next:async (res)=>{
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);

        const tokenPayload = this.auth.decodedToken();

        this.userStore.setFullNameForStore(tokenPayload.unique_name);
        this.userStore.setRoleForStore(tokenPayload.role);
        
        this.spinner.hide();
        this.router.navigate(['/' + tokenPayload.role]);
      },
      error:(err)=>{
        this.snackBar.open("Login Error! Error Code " + err.status, "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
      }
    });

    this.spinner.hide();
}}
