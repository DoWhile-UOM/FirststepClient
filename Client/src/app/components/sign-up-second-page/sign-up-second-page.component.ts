import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { NgForm } from '@angular/forms';
import {  OnInit } from '@angular/core';
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
import { AddSkillsComponent } from "../add-skills/add-skills.component";
import { SeekerService } from '../../../services/seeker.service';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-sign-up-second-page',
  standalone: true,
  imports: [MatToolbar, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent],
  templateUrl: './sign-up-second-page.component.html',
  styleUrl: './sign-up-second-page.component.css'
})
export class SignUpSecondPageComponent {
    firstName = '';
    lastName = '';
    phoneNumber = '';
    email = '';
    university = '';
    linkedin = '';
    bio = '';
    description = '';
  
    private baseUrl = 'https://localhost:7213/api/Seeker/';
  
    ngOnInit(): void {
      // Initialize any additional state or subscriptions here
    }
  
    submitForm(): void {
      const seekerData = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone_number: this.phoneNumber,
        email: this.email,
        university: this.university,
        linkedin: this.linkedin,
        bio: this.bio,
        description: this.description,
      };
  
      axios
        .post(this.baseUrl + 'AddSeeker', seekerData)
        .then((response) => {
          console.log('Seeker added successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error adding seeker:', error);
        });
    }
}