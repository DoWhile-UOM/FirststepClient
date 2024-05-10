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
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSelectModule, MatOptionModule],
  templateUrl: './seeker-signup.component.html',
  styleUrl: './seeker-signup.component.css'
})
export class SeekerSignupComponent {

}
