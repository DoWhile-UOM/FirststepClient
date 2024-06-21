import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@syncfusion/ej2-angular-pdfviewer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, FlexLayoutServerModule, SpinnerComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  hide = true;
  token_id: string = 'nmIkuA6ZIO';

  constructor(private router: Router,private auth: AuthService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar,private route: ActivatedRoute) {
    console.log('Company ID:', this.token_id);
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.token_id = id; // convert string to integer 10 is base
        console.log('Company ID:', this.token_id);
      }
    });

  }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordconfirm: new FormControl('', [Validators.required]),
    token: new FormControl(this.token_id, [Validators.required])
  });

  onLogin() {
    //console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.spinner.show();
    const passwordConfirmControl = this.loginForm.get('passwordconfirm');
    if (passwordConfirmControl) {
      if(this.loginForm.value.password != this.loginForm.value.passwordconfirm){
        this.snackBar.open("Passwords do not match", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
        this.spinner.hide();
        return;
      }

      passwordConfirmControl.disable();
      this.loginForm.get('token')?.setValue(this.token_id);
      this.auth.ResetPasswordNew(this.loginForm.value);
    }

    this.spinner.hide();

  }
}
