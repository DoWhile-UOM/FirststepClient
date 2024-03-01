import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    NavBarComponent,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutServerModule,
  ],
})
export class LoginComponent {
  hide = true;
  loginObj: Login;
  constructor(/*private http: HttpClient*/) {
    this.loginObj = new Login();
  }
  onLogin() {
    debugger;
    // this.http.post('http://localhost:3000/login',this.loginObj).subscribe((res:any)=>{
    //     if(res.result){
    //         alert('Login Success');
    //     }
    //     else{
    //         alert(res.message);
    //     }
    // });
  }
}
export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
