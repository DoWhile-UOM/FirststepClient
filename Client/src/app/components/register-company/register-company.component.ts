import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
//import { FileUploadComponent } from "../../CompanyPortal/shared/file-upload/file-upload.component";
//import { JobOfferListComponent } from "../../CompanyPortal/shared/job-offer-list/job-offer-list.component";

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule, } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, Subscribable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule,NavBarComponent],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent{




  //form group for the stepper
  firstFormGroup = this._formBuilder.group({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    email: ['', Validators.required],
    otp: ['', Validators.required],
    pNumber: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    businessScl: ['', Validators.required],
    location: ['', Validators.required],
    des: ['', Validators.required],
    logo: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder,private http: HttpClient) { }

  apiUrl='https://localhost:7093/api/Attachment';

  selectedFile: File | null = null;

  //image
  ngOnInit(): void {
  }
  url = "./assets/images/SeekerEdit.jpg";
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      return; // Handle no file selected case
    }

    const fileData = new FormData();
    fileData.append('files', this.selectedFile, this.selectedFile.name);

    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'multipart/form-data');

    this.http.post(this.apiUrl, fileData, { headers })
      .subscribe(response => {
        console.log('Upload successful:', response);
        this.selectedFile = null; // Clear selection after successful upload
      }, error => {
        console.error('Upload error:', error);
      });
  }




  onselectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

    }
  }

}
