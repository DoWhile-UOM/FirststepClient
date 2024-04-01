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
import { CompanyService } from '../../../services/company.service';


@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule,NavBarComponent],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent{




  //form group for the stepper
  companyReg = this._formBuilder.group({
    company_name: ['', Validators.required],
    company_website: ['', Validators.required],
    company_email: ['', Validators.required],
    //otp: ['', Validators.required],
    //pNumber: ['', Validators.required]
    business_reg_certificate: ['', Validators.required],
    company_applied_date: ['', Validators.required],
    certificate_of_incorporation: ['', Validators.required],
    company_phone_number: ['', Validators.required],
    business_reg_no: ['', Validators.required],
  });

  constructor(private company:CompanyService,private _formBuilder: FormBuilder,private http: HttpClient) { }

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

  onRegister(){
    //console.log(this.loginForm.value);
    //this.auth.signup(this.myForm.value)
    this.company.CompanyRegister(this.companyReg.value)
    .subscribe({
      next:(res)=>{
        //this.auth.storeToken(res.token)
        //alert(res.message)
        console.log(res.token)

        //console.log(res.message);
        //this.loginForm.reset();
        //this.auth.storeToken(res.accessToken);
        //this.auth.storeRefreshToken(res.refreshToken);

        //const tokenPayload = this.auth.decodedToken();
        //console.log(tokenPayload);

        //this.userStore.setFullNameForStore(tokenPayload.unique_name);
        //.userStore.setRoleForStore(tokenPayload.role);
        //console.log(tokenPayload);
        //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
        //this.router.navigate(['seeker'])
        /*
        switch(tokenPayload.role){
          case "Seeker":{
            this.router.navigate(['seeker'])
            break;
          }
          case "Cadmin":{
            this.router.navigate(['ca'])
            break;
          }
        }*/


      },
      error:(err)=>{
        alert(err.message)
        console.log(err)
      }
  });
  
}}














