import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { JobOfferListComponent } from '../job-offer-list/job-offer-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { SeekerService } from '../../../services/seeker.service';
import axios, { AxiosError } from 'axios';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { JobfieldService } from '../../../services/jobfield.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


interface field {
  field_id: number;
  field_name: string;
}

interface newSeeker {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  university: string;
  linkedin: string;
  field_id: number;
  cVurl: string;
  bio: string;
  description: string;
  profile_picture: string;
  seekerSkills: string[];

}

interface requestOTP {
  email: string | null | undefined;
}

interface verifyOTP {
  email: string | null | undefined;
  otp: string | null | undefined;
}
@Component({
    selector: 'app-seeker-signup',
    standalone: true,
    templateUrl: './seeker-signup.component.html',
    styleUrl: './seeker-signup.component.css',
    imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSelectModule, MatOptionModule, CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent, MatToolbar]
})
export class SeekerSignupComponent {
  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  remainingTime = 0;
  reqOTPbtntxt = "Request OTP";
  isFormVerified: boolean = false;
  //file upload
url = './assets/images/SeekerEdit.jpg';

onselectFile(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };
  }
}

seekerReg = this._formBuilder.group({
  first_name: ['', Validators.required],
  last_name: ['', Validators.required],
  email: ['', Validators.required],
  password_hash: ['', Validators.required],
  phone_number: ['', Validators.required],
  university: [''],
  linkedin: [''],
  field_id: ['', Validators.required],
  cVurl: ['', Validators.required],
  bio: ['', Validators.required],
  // otp: [''],
  description: ['', Validators.required],
  profile_picture: [''],
  seekerSkills: this._formBuilder.array([]),
  otp_in: ['', Validators.required]

});

constructor(
  private _formBuilder: FormBuilder,
  private jobFieldService: JobfieldService,
  private seekerService: SeekerService,
  private _snackBar: MatSnackBar,
  private snackbar: MatSnackBar, private auth: AuthService, private http: HttpClient
) {}

fields: field[] = [];


seekerDetails: newSeeker[] = [];

async ngOnInit() {
  await this.jobFieldService.getAll().then((response) => {
    this.fields = response;
    console.log(this.fields);
  });

  //otp
  this.seekerReg.statusChanges.subscribe(status => {
    if (this.isEmailVerified) {
      this.isFormVerified = status === 'VALID';
    }
  });
}
ngAfterViewInit() {
	this.skills = this.addSkillsComponent.skills;
}


//skills
skills: string[] = [];
@ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;
changeSkillsArray($event: Event){
	var skills = $event;
	if (skills != null){
		this.skills = skills as unknown as string[];
	}
	alert("Skills: " + this.skills);
}

async requestOTP() {

  const userData: requestOTP = {
    email: this.seekerReg.get('company_email')?.value
  }

  let verificationResult = await this.auth.requestOTP(userData)

  if (verificationResult == true) {
    this.snackbar.open("OTP Sent successful", "")._dismissAfter(3000);
    this.printTextAfterFiveMinutes();
  } else {
    this.snackbar.open("OTP Request failed Please try Again", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  }
}


async VerifyOTP() {
  console.log(this.seekerReg.get('otp_in')?.value);

  const userData: verifyOTP = {
    email: this.seekerReg.get('email')?.value,
    otp: this.seekerReg.get('otp_in')?.value
  }

  let verificationResult = await this.auth.verifyOTP(userData);

  if (verificationResult == true) {
    this.isEmailVerified = true;
    this.snackbar.open("OTP verification successful", "", { duration: 2000 });
  } else {
    this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  }

}

async printTextAfterFiveMinutes() {

  this.isOTPRequestSent = true;
  this.remainingTime = 5 * 60; // Initialize remaining time in seconds
  this.reqOTPbtntxt = this.remainingTime.toString();

  const intervalId = setInterval(() => {
    this.remainingTime--;
    if (this.remainingTime <= 0) {
      clearInterval(intervalId); // Stop the timer when time is up
      console.log("Timer off");
      this.isOTPRequestSent = false;
      this.reqOTPbtntxt = "Request OTP";
    }
  }, 1000); // Update every second
}

//Submit button
onRegister() {
    // this.seekerReg.value.seekerSkills = this.skills.join(','); // Fix: Convert array of strings to a single string separated by commas
    this.seekerService.SeekerRegister(this.seekerReg.value).subscribe({
      next: (res) => {
        this._snackBar.open("Registration successful", "Close", { duration: 3000 });
      },
      error: (err) => {
        this.displayError(err);
      }
    });
  
}

displayError(error: HttpErrorResponse) {
  let message = 'An error occurred';
  if (error.error instanceof ErrorEvent) {
    message = `Client/network error: ${error.error.message}`;
  } else {
    message = `Server returned code ${error.status}, error message is: ${error.statusText}; Details: ${error.error}`;
  }
  this._snackBar.open(message, "Close", { duration: 5000 });
}



}
