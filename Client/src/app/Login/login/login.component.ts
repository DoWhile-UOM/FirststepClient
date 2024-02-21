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
    Password: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required])
  });

  onLogin(){
    console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert(res.message)
        console.log(res.message)
      },
      error:(err)=>{
        alert(err.message)
        console.log(err.message)
      }
  });
  
}}
