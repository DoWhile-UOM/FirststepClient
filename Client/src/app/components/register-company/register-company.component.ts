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


@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FlexLayoutServerModule, MatCardModule, MatGridListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, FlexLayoutModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  isFormVerified: boolean = false;


  //form group for the stepper
  companyReg = this._formBuilder.group({
    company_name: ['', Validators.required],//
    company_website: [''],//
    company_email: ['', [Validators.required, Validators.email]],//
    company_description: [''],//
    company_logo: [''],//
    company_business_scale: ['', Validators.required],//
    business_reg_certificate: [''],//
    company_registered_date: ['', Validators.required],///
    certificate_of_incorporation: [''],//
    company_phone_number: ['', Validators.required],//
    business_reg_no: ['', Validators.required],//
  });



  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private auth: AuthService, private company: CompanyService, private _formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.companyReg.get('company_email')?.disable();

    // Watch for form validity changes
    this.companyReg.statusChanges.subscribe(status => {
      if (this.isEmailVerified) {
        this.isFormVerified = status === 'VALID';
      }
    });
  }

  async onRegister() {

    if (!this.isEmailVerified) {
      this.snackbar.open("Please verify your email first", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return;
    } else {
      if (this.companyReg.invalid) {
        this.snackbar.open("Please Enter the Details Correctly", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      } else {
        this.company.CompanyRegister(this.companyReg.value);
        this.finalDialog();
        //Should redirect or popup show
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

}