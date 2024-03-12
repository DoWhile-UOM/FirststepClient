import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,private auth:AuthService,private userStore:UserStoreService){}


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
        //alert(res.message)
        //console.log(res.token)

        //console.log(res.message);
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);

        const tokenPayload = this.auth.decodedToken();
        //console.log(tokenPayload);

        this.userStore.setFullNameForStore(tokenPayload.unique_name);
        this.userStore.setRoleForStore(tokenPayload.role);
        console.log(tokenPayload);
        //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
        //this.router.navigate(['home'])
        switch(tokenPayload.role){
          case "User":{
            this.router.navigate(['home'])
            break;
          }
          case "Cadmin":{
            this.router.navigate(['ManageRoles'])
            break;
          }
        }


      },
      error:(err)=>{
        alert(err.message)
        console.log(err)
      }
  });
  
}}
