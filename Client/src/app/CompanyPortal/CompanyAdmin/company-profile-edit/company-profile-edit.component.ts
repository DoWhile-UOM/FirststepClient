import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';



@Component({
    selector: 'app-company-profile-edit',
    standalone: true,
    templateUrl: './company-profile-edit.component.html',
    styleUrl: './company-profile-edit.component.css',
    imports: [NavBarComponent,MatInputModule,MatFormFieldModule,FormsModule,CdkTextareaAutosize,TextFieldModule,MatSelectModule,MatIconModule,ReactiveFormsModule,MatDividerModule,MatButtonModule]
})
export class CompanyProfileEditComponent {
  selected = 'option2';
  selectedCity= 'option1';
  selectedProvince= 'option1';
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
