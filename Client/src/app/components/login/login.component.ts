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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule,MatCardModule,MatIconModule,MatInputModule,MatFormFieldModule,MatButtonModule,FlexLayoutServerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  user = "ca"; 
  userID = 0;

  username = "sample";
  companyid = 0;
  companyname = "";

  constructor(
    private router: Router,
    private auth:AuthService,
    private userStore:UserStoreService){

  }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email])
  });

  onLogin(){
    //console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        //this.auth.storeToken(res.token)
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);

        const tokenPayload = this.auth.decodedToken();

        this.userStore.setFullNameForStore(tokenPayload.unique_name);
        this.userStore.setRoleForStore(tokenPayload.role);
        
        //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
        
        sessionStorage.clear();


        ////// temporary code to be removed
        if (tokenPayload.role == 'seeker'){
          this.userID = 3;
        }
        else{
          this.userID = 10;
          this.companyname = "BISTEC GLOBAL SERVICES";
          this.companyid = 7;
        }
        ////// temporary code to be removed

        sessionStorage.setItem('user', tokenPayload.role);
        sessionStorage.setItem('user_id', this.userID.toString());  
        sessionStorage.setItem('name', this.username);

        switch(tokenPayload.role){
          case 'seeker':
            //sessionStorage.setItem('name', userData.name);
            break;
          case 'ca':
            sessionStorage.setItem('companyId', this.companyid.toString());
            sessionStorage.setItem('companyName', this.companyname);
            break;
        }


        this.router.navigate(['/' + tokenPayload.role]);
      },
      error:(err)=>{
        alert(err.message)
        console.log(err)
      }
  });
  
}}
