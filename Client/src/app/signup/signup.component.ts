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
    Password: new FormControl('', [Validators.required]),
    Cpassword: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Fname: new FormControl('', [Validators.required]),
    Lname: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required])

  });


  onSignup(){
    if(this.signupform.value.Password!=this.signupform.value.Cpassword){
      alert("Password and Confirm Password should be same")
      return
    }
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
