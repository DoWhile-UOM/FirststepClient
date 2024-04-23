import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-signup-first-page',
  standalone: true,
  imports: [ MatToolbar, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, FileUploadComponent, JobOfferListComponent, AddSkillsComponent],
  templateUrl: './signup-first-page.component.html',
  styleUrl: './signup-first-page.component.css'
})
export class SignupFirstPageComponent implements OnInit{signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private seekerService: SeekerService,
    private snackBar: MatSnackBar
  ) {
    // Initialize the FormGroup in the constructor
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      university: [''],
      linkedin: ['', Validators.pattern(/^https?:\/\/[^\s]+$/)],
      bio: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    // Additional initialization logic, if needed
  }

  async submitForm() {
    if (!this.signupForm.valid) {
      this.snackBar.open('Please fill in all required fields', '', { duration: 3000 });
      return;
    }

    const seekerData = this.signupForm.value;

    try {
      await this.seekerService.addseeker(seekerData);
      this.snackBar.open('Seeker added successfully!', '', { duration: 3000 });
    } catch (error) {
      console.error('Error adding seeker:', error);
      this.snackBar.open('Error adding seeker. Please try again.', '', { duration: 3000 });
    }
  }

}

