import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
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
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { SeekerService } from '../../../services/seeker.service';
import axios, { AxiosError } from 'axios';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { JobfieldService } from '../../../services/jobfield.service';

interface Field {
  field_name: string;
  field_id: number;
}

interface Seeker {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  university: string;
  linkedin: string;
  bio: string;
  description: string;
  //skills
  field_id: number;
}

@Component({
  selector: 'app-sign-up-second-page',
  standalone: true,
  imports: [
    MatToolbar,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule,
    FileUploadComponent,
    JobOfferListComponent,
    AddSkillsComponent,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './sign-up-second-page.component.html',
  styleUrl: './sign-up-second-page.component.css',
})
export class SignUpSecondPageComponent {
  adData: Seeker = {} as Seeker;

  fields: Field[] = [];

  constructor(
    private seekerService: SeekerService,
    private jobFieldService: JobfieldService
  ) {}

  async ngOnInit() {
    await this.jobFieldService.getAll().then((response) => {
      this.fields = response;
      console.log(this.fields);
    });
  }

  first_name = '';
  last_name = '';
  phone_number = '';
  email = '';
  university = '';
  linkedin = '';
  field_id = '';
  bio = '';
  description = '';


  async submitForm() {
    const seekerData = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number,
      email: this.email,
      university: this.university,
      linkedin: this.linkedin,
      bio: this.bio,
      description: this.description,
      field_id: this.field_id,
    };

    try {
      const response = await axios.post('https://localhost:7213/api/Seeker/AddSeeker');
      console.log('Seeker added successfully:', response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // The server responded with a status other than 2xx.
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        // The request was made but no response was received or an error occurred in setting up the request.
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      throw error;  // Re-throwing the error after logging (adjust based on how you want to handle failures)
    }
  }
}
