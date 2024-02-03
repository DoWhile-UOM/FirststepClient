import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [NavBarComponent,FormsModule,HttpClientModule]
})
export class LoginComponent {
    loginObj: Login;
    constructor(private http: HttpClient) {
        this.loginObj = new Login();
    }
    onLogin(){
        debugger;
        this.http.post('http://localhost:3000/login',this.loginObj).subscribe((res:any)=>{
            if(res.result){
                alert('Login Success');
            }
            else{
                alert(res.message);
            }
        });
    }
}
export class Login{
    email: string;
  password: string;

  constructor(){
    this.email='';
    this.password='';
  }
}