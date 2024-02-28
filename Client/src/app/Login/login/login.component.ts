import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth:AuthService){}


  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  onLogin(){
    console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.auth.storeToken(res.token)
        alert(res.message)
        console.log(res.token)
      },
      error:(err)=>{
        alert(err.message)
        console.log(err)
      }
  });
  
}}
