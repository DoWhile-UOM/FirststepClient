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


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onLogin(){
    console.log(this.myForm.value);
    //this.auth.login(this.myForm.value)
  };


  OnSignup(){
    console.log(this.myForm.value);
    //this.auth.signup(this.myForm.value)
  };
  
}
