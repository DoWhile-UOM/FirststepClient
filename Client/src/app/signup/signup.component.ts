import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private auth:AuthService){}
  signupform = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email])
  });


  onSignup(){
    console.log(this.signupform.value);
    //this.auth.signup(this.myForm.value)
    this.auth.signup(this.signupform.value)
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
