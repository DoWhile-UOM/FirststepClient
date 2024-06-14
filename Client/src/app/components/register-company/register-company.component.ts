import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
//import { FileUploadComponent } from "../../CompanyPortal/shared/file-upload/file-upload.component";
//import { JobOfferListComponent } from "../../CompanyPortal/shared/job-offer-list/job-offer-list.component";

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
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
import { MatGridListModule } from '@angular/material/grid-list';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../../../services/company.service';

import { AuthService } from '../../../services/auth.service';
import { Apipaths } from '../../../services/apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationBoxComponent } from '../email-verification-box/email-verification-box.component';
import { PopUpFinalComponent } from '../pop-up-final/pop-up-final.component';
import { SeekerApplicationFileUploadComponent } from "../seeker-application-file-upload/seeker-application-file-upload.component";

interface CompanyDocuments {
  company_logo: File|null;
  business_reg_certificate: File|null;
  certificate_of_incorporation: File|null;
}

@Component({
    selector: 'app-register-company',
    standalone: true,
    templateUrl: './register-company.component.html',
    styleUrl: './register-company.component.css',
    imports: [MatSelectModule, CommonModule, FlexLayoutServerModule, MatCardModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, SeekerApplicationFileUploadComponent]
})
export class RegisterCompanyComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  isFormVerified: boolean = false;
  verifiedemail: string = "";
  uploadDoc: CompanyDocuments={} as CompanyDocuments


  //form group for the stepper
  companyReg = this._formBuilder.group({
    company_name: ['', Validators.required],//
    company_website: [''],//
    company_email: new FormControl({ value: '', disabled: true }),//
    company_description: [''],//
    company_logo: [this.uploadDoc.company_logo],
    company_business_scale: ['', Validators.required],//
    business_reg_certificate: [this.uploadDoc.business_reg_certificate],
    company_registered_date: ['', Validators.required],///
    certificate_of_incorporation: [this.uploadDoc.certificate_of_incorporation],
    company_phone_number: ['', Validators.required],//
    business_reg_no: ['', Validators.required],//
  });



  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private auth: AuthService, private company: CompanyService, private _formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    //this.companyReg.get('company_email')?.disable();

    // Watch for form validity changes
    this.companyReg.statusChanges.subscribe(status => {
      if (this.isEmailVerified) {
        this.isFormVerified = status === 'VALID';
      }
    });
  }

  async onRegister() {
    this.isEmailVerified = true;
    if (!this.isEmailVerified) {
      this.snackbar.open("Please verify your email first", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return;
    } else {
      if (this.companyReg.invalid) {
        this.snackbar.open("Please Enter the Details Correctly", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      } else {
        try {
          this.companyReg.get('certificate_of_incorporation')?.setValue(this.uploadDoc.certificate_of_incorporation);
          this.companyReg.get('company_logo')?.setValue(this.uploadDoc.company_logo);
          this.companyReg.get('business_reg_certificate')?.setValue(this.uploadDoc.business_reg_certificate);
          this.companyReg.get('company_email')?.enable();
          let responseRegReq = await this.company.CompanyRegister(this.companyReg.value);

          // Optionally disable the company_email control again
          this.companyReg.get('company_email')?.disable();

          if (responseRegReq.success) {
            this.snackbar.open("Company registered successfully", "")._dismissAfter(3000);
            this.finalDialog();
          } else {
            this.snackbar.open("Registration Error: " + responseRegReq.out, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
          }
        } catch (error) {
          console.error('Error during registration: ', error);
          this.snackbar.open("Registration failed. Please try again.", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
        }
      }
    }
  }

  openDialog(): void {//Open Dialog Box for email verifcation
    const dialogRef = this.dialog.open(EmailVerificationBoxComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.companyReg.get('company_email')?.setValue(result.emailAddress);//result.emailAddress refer to verified email
      this.isEmailVerified = result.verified;//Set email verifcation status is done
      //this.stepper.next();
    });
  }

  finalDialog(): void {
    const dialogRef = this.dialog.open(PopUpFinalComponent, {
      data: {
        title: 'Your company registration application has been sent successfully',
        message: 'Our staff is currently reviewing your application.',
        message2: 'To check the status of your application, please refer to the link that has been sent to your mailbox.'
      },
      disableClose: true  // Disables closing the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('User input:', result);
    });
  }

  onFileSelected(file: File,name:string) {
    //console.log('File selected:', name);
    //applicationData.append('cv', this.applicationData.cv);

    switch (name) {
      case "company_logo":
        this.uploadDoc.company_logo = file;
        break;
      case "business_reg_certificate":
        this.uploadDoc.business_reg_certificate = file;
        break;
      case "certificate_of_incorporation":
        this.uploadDoc.certificate_of_incorporation = file;
        break;

      default:
        this.uploadDoc.business_reg_certificate = file;
    }
  }

}