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
    password_hash: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),

  });


  onSignup(){
    //if(this.signupform.value.password_hash!=this.signupform.value.Cpassword){
    //  alert("Password and Confirm Password should be same")
    //  return
    //}
    console.log(this.signupform.value);
    //this.auth.signup(this.myForm.value)
    this.auth.signup(this.signupform.value)
    .subscribe({
      next:(res)=>{
        alert(res.message)
        console.log(res.message)
        
      },
      error:(err)=>{
        alert(err.error.message)
        console.log(err.error.message)
      }
  });
  
}}
