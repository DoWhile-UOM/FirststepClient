import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
//import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeekerService } from '../../../services/seeker.service';
import { SkillService } from '../../../services/skill.service';
import { JobfieldService } from '../../../services/jobfield.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';

interface job_Field {
  field_name: string;
  field_id: number;
}

interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: any;
  user_id: number;
  password_hash: string;
  job_Field: any;
  job_field_name: string;
  seekerSkills: string[];
}

interface updateSeeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  password: string;
  seekerSkills: string[];
} 

@Component({
  selector: 'app-seeker-edit-profile',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSlideToggleModule, MatToolbarModule, FormsModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule, MatFormField],
  templateUrl: './seeker-edit-profile.component.html',
  styleUrl: './seeker-edit-profile.component.css'
})
export class SeekerEditProfileComponent {

}
