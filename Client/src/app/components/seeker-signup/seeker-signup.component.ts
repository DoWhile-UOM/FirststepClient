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
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { JobOfferListComponent } from '../job-offer-list/job-offer-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { AddSkillsComponent } from "../add-skills/add-skills.component";
import { SeekerService } from '../../../services/seeker.service';
import axios, { AxiosError } from 'axios';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { JobfieldService } from '../../../services/jobfield.service';


interface field {
  field_name: string;
  field_id: number;
}

interface SeekerData {
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  university: string;
  linkedin: string;
  bio: string;
  description: string;
  field_id: number;
  cVurl: string;
  password_hash: string;
  profile_picture: string;
  seekerSkills: string [];
}


@Component({
    selector: 'app-seeker-signup',
    standalone: true,
    templateUrl: './seeker-signup.component.html',
    styleUrl: './seeker-signup.component.css',
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatToolbar, FileUploadComponent, JobOfferListComponent, AddSkillsComponent, MatSelectModule, MatOptionModule]
})


export class SeekerSignupComponent implements OnInit {
  url = './assets/images/SeekerEdit.jpg';
  password_hash = 'password';

  onselectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private jobFieldService: JobfieldService, private seekerService: SeekerService) {
    this.firstFormGroup = this._formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone_number: [''],
    });

    this.secondFormGroup = this._formBuilder.group({
      email: [''],
    });

    this.thirdFormGroup = this._formBuilder.group({
      university: [''],
      linkedin: [''],
      CVurl: [''],
    });

    this.fourthFormGroup = this._formBuilder.group({
      field_id: [''],
      seekerSkills: [''],
    });

    this.fifthFormGroup = this._formBuilder.group({
      bio: [''],
      description: [''],
      profile_picture: [''],
    });
  }
  
  fields: field[] = [];


  async ngOnInit() {
    await this.jobFieldService.getAll().then((response) => {
      this.fields = response;
      console.log(this.fields);
    });
  }


  async submitForm() {
    const seekerData = {

      first_name: this.firstFormGroup.get('first_name')?.value,
      last_name: this.firstFormGroup.get('last_name')?.value,
      phone_number: this.firstFormGroup.get('phone_number')?.value,
      email: this.secondFormGroup.get('email')?.value,
      university: this.thirdFormGroup.get('university')?.value,
      linkedin: this.thirdFormGroup.get('linkedin')?.value,
      cVurl: this.thirdFormGroup.get('CVurl')?.value,
      field_id: this.fourthFormGroup.get('field_id')?.value,
      seekerSkills: this.fourthFormGroup.get('seekerSkills')?.value,
      bio: this.fifthFormGroup.get('bio')?.value,
      description: this.fifthFormGroup.get('description')?.value,
      profile_picture: this.fifthFormGroup.get('profile_picture')?.value,
    };
    

    try {
      const response = await axios.post('https://localhost:7213/api/Seeker/AddSeeker');
      console.log('Seeker added successfully:', response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      throw error
    }
  }

}