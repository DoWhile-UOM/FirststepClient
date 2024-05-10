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
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray } from '@angular/forms';

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
@Component({
  selector: 'app-seeker-signup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSelectModule, MatOptionModule, CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent, MatToolbar],
  templateUrl: './seeker-signup.component.html',
  styleUrl: './seeker-signup.component.css'
})
export class SeekerSignupComponent {
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
  otp: [''],
  description: ['', Validators.required],
  profile_picture: [''],
  seekerSkills: this._formBuilder.array([]),
});

constructor(
  private _formBuilder: FormBuilder,
  private jobFieldService: JobfieldService,
  private seekerService: SeekerService,
  private _snackBar: MatSnackBar
) {}

fields: field[] = [];


seekerDetails: newSeeker[] = [];

async ngOnInit() {
  await this.jobFieldService.getAll().then((response) => {
    this.fields = response;
    console.log(this.fields);
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
