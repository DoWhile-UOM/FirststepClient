import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatStepper } from '@angular/material/stepper';
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
import { SeekerApplicationFileUploadComponent } from '../seeker-application-file-upload/seeker-application-file-upload.component';


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
    imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSelectModule, MatOptionModule, CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent, MatToolbar,MatGridTile,MatGridList,MatStepper,SeekerApplicationFileUploadComponent]
})

export class SeekerSignupComponent implements OnInit, AfterViewChecked {
  isEmailVerified = false;
  isOTPRequestSent = false;
  remainingTime = 0;
  reqOTPBtnText = "Request OTP";
  isFormVerified = false;

  hide = true; 

  url = "./assets/images/dp.png";
  selectedFile: File | null = null;
  selectedImage: File | null = null;

  seekerReg: FormGroup;

  fields: any = [];
  seekerDetails: NewSeeker[] = [];
  skills: string[] = [];

  @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private jobFieldService: JobfieldService,
    private seekerService: SeekerService,
    private _snackBar: MatSnackBar,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.seekerReg = this._formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      university: ['', [Validators.maxLength(100)]],
      linkedin: ['', [Validators.pattern(/^(http(s)?:\/\/)?(www\.)?linkedin\.com\/.*$/)]],
      field_id: ['', Validators.required],
      cVurl: [''],
      bio: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
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

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // File selection handler for profile picture
  onselectFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // File selection handler for CV
  onCvSelected(file: File) {
    this.selectedFile = file;
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
      this.snackbar.open("OTP Sent successfully", "", { duration: 3000 });
      this.printTextAfterFiveMinutes();
    } else {
      this.snackbar.open("OTP Request failed. Please try again.", "", { panelClass: ['app-notification-error'], duration: 3000 });
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
      this.snackbar.open("OTP verification failed", "", { panelClass: ['app-notification-error'], duration: 3000 });
    }
  }

  // OTP timer
  async printTextAfterFiveMinutes() {
    this.isOTPRequestSent = true;
    this.remainingTime = 1800; // Initialize remaining time in seconds
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

  async onRegister() {
    // Ensure the seekerSkills array is up-to-date
    this.seekerReg.patchValue({
      seekerSkills: this.skills.length ? this.skills : ['default_skill'],
      profile_picture: this.url || 'default_profile_picture_url', // Assign temporary value if not set
      cVurl: this.seekerReg.get('cVurl')?.value || 'default_cv_url', // Assign temporary value if not set
    });

    const formData = new FormData();
    formData.append('email', this.seekerReg.get('email')?.value);
    formData.append('first_name', this.seekerReg.get('first_name')?.value);
    formData.append('last_name', this.seekerReg.get('last_name')?.value);
    formData.append('phone_number', this.seekerReg.get('phone_number')?.value);
    formData.append('password', this.seekerReg.get('password')?.value); // Ensure password is included
    formData.append('bio', this.seekerReg.get('bio')?.value);
    formData.append('description', this.seekerReg.get('description')?.value);
    formData.append('university', this.seekerReg.get('university')?.value);
    formData.append('CVurl', this.seekerReg.get('cVurl')?.value || '');
    formData.append('profile_picture', this.seekerReg.get('profile_picture')?.value || '');
    formData.append('linkedin', this.seekerReg.get('linkedin')?.value);
    formData.append('field_id', this.seekerReg.get('field_id')?.value);

    // Append each skill individually
    if (this.skills.length) {
      this.skills.forEach((skill) => formData.append('seekerSkills', skill));
    }

    if (this.selectedFile) {
      formData.append('cvFile', this.selectedFile);
    }

    if (this.selectedImage) {
      formData.append('profilePictureFile', this.selectedImage);
    }

    this.seekerService.SeekerRegister(formData).subscribe({
      next: () => {
        this._snackBar.open('Registration successful', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.displayError(err);
      },
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
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

  isFormInvalid(step: number): boolean {
    switch (step) {
      case 0:
        return this.seekerReg.get('first_name')?.invalid || this.seekerReg.get('last_name')?.invalid || this.seekerReg.get('phone_number')?.invalid || false;
      case 1:
        return this.seekerReg.get('email')?.invalid || this.seekerReg.get('password')?.invalid || this.seekerReg.get('otp_in')?.invalid || !this.isEmailVerified || false;
      case 2:
        return this.seekerReg.get('university')?.invalid || this.seekerReg.get('linkedin')?.invalid || false;
      case 3:
        return this.seekerReg.get('field_id')?.invalid || this.seekerReg.get('seekerSkills')?.invalid || false;
      case 4:
        return this.seekerReg.get('bio')?.invalid || this.seekerReg.get('description')?.invalid || false;
      default:
        return true;
    }
  }
}
