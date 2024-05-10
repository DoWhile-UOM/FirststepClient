import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadComponent } from '../../CompanyPortal/shared/file-upload/file-upload.component';
import { JobOfferListComponent } from '../../CompanyPortal/shared/job-offer-list/job-offer-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import axios from 'axios';


interface seekerData {
  Firstname: string;
  Lastname: string;
  EmailAddress: string;
  ContactNumber: string;
  University: string;
  LinkedIn: string;
  Field: string;
  Bio: string;
  Description: string;
  Password: string;
  
}

@Component({
  selector: 'app-seekersignup',
  standalone: true,
  templateUrl: './seekersignup.component.html',
  styleUrl: './seekersignup.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    FileUploadComponent,
    JobOfferListComponent,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule, MatToolbar
  ],
})
export class SeekersignupComponent implements OnInit {

  //default image for the profile picture
  url = './assets/images/SeekerEdit.jpg';

  //function to select the file
  onselectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // You can keep this method empty or add any additional initialization if needed
  }

}