import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridTile } from '@angular/material/grid-list';
import { MatGridList } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { JobOfferListComponent } from '../job-offer-list/job-offer-list.component';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { SeekerService } from '../../../services/seeker.service';
import { JobfieldService } from '../../../services/jobfield.service';
import { AuthService } from '../../../services/auth.service';
import axios, { AxiosError } from 'axios';

interface NewSeeker {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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

interface RequestOTP {
  email: string | null | undefined;
}

interface VerifyOTP {
  email: string | null | undefined;
  otp: string | null | undefined;
}
@Component({
    selector: 'app-seeker-signup',
    standalone: true,
    templateUrl: './seeker-signup.component.html',
    styleUrl: './seeker-signup.component.css',
    imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSelectModule, MatOptionModule, CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent, MatToolbar,MatGridTile,MatGridList]
})

export class SeekerSignupComponent implements OnInit {
  isEmailVerified = false;
  isOTPRequestSent = false;
  remainingTime = 0;
  reqOTPBtnText = "Request OTP";
  isFormVerified = false;

  // File upload URL
  url = './assets/images/SeekerEdit.jpg';

  seekerReg: FormGroup;

  fields: any = [];
  seekerDetails: NewSeeker[] = [];
  skills: string[] = [];

  @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

  constructor(
    private _formBuilder: FormBuilder,
    private jobFieldService: JobfieldService,
    private seekerService: SeekerService,
    private _snackBar: MatSnackBar,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.seekerReg = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone_number: ['', Validators.required],
      university: [''],
      linkedin: [''],
      field_id: ['', Validators.required],
      cVurl: [''],
      bio: ['', Validators.required],
      description: ['', Validators.required],
      profile_picture: [''],
      seekerSkills: [[]],
      otp_in: ['']
    });
  }

  async ngOnInit() {
    await this.jobFieldService.getAll().then((response) => {
      this.fields = response;
      console.log(this.fields);
    });

    // OTP
    this.seekerReg.statusChanges.subscribe(status => {
      if (this.isEmailVerified) {
        this.isFormVerified = status === 'VALID';
      }
    });
  }

  ngAfterViewInit() {
    this.skills = this.addSkillsComponent.skills;
  }

  // File selection handler
  onselectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
  }

  // Skills change handler
  changeSkillsArray(event: any) {
    const skills = event;
    if (skills != null) {
      this.skills = skills as string[];
      this.seekerReg.patchValue({ seekerSkills: this.skills });
    }
    alert("Skills: " + this.skills);
  }

  // Request OTP
  async requestOTP() {
    const userData: RequestOTP = {
      email: this.seekerReg.get('email')?.value
    };

    const verificationResult = await this.auth.requestOTP(userData);

    if (verificationResult) {
      this.snackbar.open("OTP Sent successfully", "")._dismissAfter(3000);
      this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open("OTP Request failed. Please try again.", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  // Verify OTP
  async VerifyOTP() {
    const userData: VerifyOTP = {
      email: this.seekerReg.get('email')?.value,
      otp: this.seekerReg.get('otp_in')?.value
    };

    const verificationResult = await this.auth.verifyOTP(userData);

    if (verificationResult) {
      this.isEmailVerified = true;
      this.snackbar.open("OTP verification successful", "", { duration: 2000 });
    } else {
      this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  // OTP timer
  async printTextAfterFiveMinutes() {
    this.isOTPRequestSent = true;
    this.remainingTime = 60; // Initialize remaining time in seconds
    this.reqOTPBtnText = this.remainingTime.toString();

    const intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(intervalId); // Stop the timer when time is up
        console.log("Timer off");
        this.isOTPRequestSent = false;
        this.reqOTPBtnText = "Request OTP";
      }
    }, 1000); // Update every second
  }

  onRegister() {
    // Ensure the seekerSkills array is up-to-date
  this.seekerReg.patchValue({
    seekerSkills: this.skills.length ? this.skills : ['default_skill'],
    profile_picture: this.url || 'default_profile_picture_url', // Assign temporary value if not set
    cVurl: this.seekerReg.get('cVurl')?.value || 'default_cv_url' // Assign temporary value if not set
  });

    this.seekerService.SeekerRegister(this.seekerReg.value).subscribe({
      next: () => {
        this._snackBar.open("Registration successful", "Close", { duration: 3000 });
      },
      error: (err) => {
        this.displayError(err);
      }
    });
  }

  // Display error message
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

