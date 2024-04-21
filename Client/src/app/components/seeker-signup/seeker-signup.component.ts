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


interface SeekerData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  university: string;
  linkedin: string;
  bio: string;
  description: string;
}


@Component({
    selector: 'app-seeker-signup',
    standalone: true,
    templateUrl: './seeker-signup.component.html',
    styleUrl: './seeker-signup.component.css',
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatToolbar, FileUploadComponent, JobOfferListComponent, AddSkillsComponent]
})


export class SeekerSignupComponent implements OnInit {
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private seekerService: SeekerService) {
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
    });

    this.fourthFormGroup = this._formBuilder.group({
      field_name: [''],
    });

    this.fifthFormGroup = this._formBuilder.group({
      bio: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  seekerData: SeekerData = {} as SeekerData;

  async submitForm() { 
    try {
      await this.seekerService.addseeker(this.seekerData);
      console.log('Seeker added successfully:');
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else {
          console.error('No response received:', error.message);
        }
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  }
}