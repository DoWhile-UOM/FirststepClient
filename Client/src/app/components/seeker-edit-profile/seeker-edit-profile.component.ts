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
    templateUrl: './seeker-edit-profile.component.html',
    styleUrl: './seeker-edit-profile.component.css',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSlideToggleModule, MatToolbarModule, FormsModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule, MatFormField, AddSkillsComponent]
})
export class SeekerEditProfileComponent {
   // The image url of the default image
 url = './assets/images/SeekerEdit.jpg';

 //image upload
 onselectFile(event: any) {
   if (event.target.files) {
     var reader = new FileReader();
     reader.readAsDataURL(event.target.files[0]);
     reader.onload = (event: any) => {
       this.url = event.target.result;
     };
   }
 }

 seekerDetails: Seeker = {} as Seeker;
 seekerUpdate: updateSeeker = {} as updateSeeker;

 constructor(
   private seekerService: SeekerService,
   private jobFieldService: JobfieldService
 ) {}
 user_id: number = 2095;

 fields: job_Field[] = [];

 selectedFieldId!: number;

 async ngOnInit() {
   await this.fetchSeekerDetails();
   await this.jobFieldService.getAll().then((response) => {
     this.fields = response;
     this.selectedFieldId = this.seekerDetails.field_id; // Assuming this is how you fetch the current field ID
   });
 }

 async ngAfterViewInit() {
   this.skills = this.addSkillsComponent.skills;
 }
 data(data: any) {
   throw new Error('Method not implemented.');
 }

 //radiobutton
 selected = false;

 onRadioChange() {
   this.selected = true;
 }

 //get
 async fetchSeekerDetails() {
   try {
     const response = await this.seekerService.getSeekerDetails(this.user_id);
     this.seekerDetails = response;
   } catch (error) {
     console.error('Error fetching seeker details:', error);
   }
 }

 //skills

 skills: string[] = [];
 @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

 changeSkillsArray($event: Event) {
   var skills = $event;
   if (skills != null) {
     this.skills = skills as unknown as string[];
   }
   alert('Skills: ' + this.skills);
 }

 //update
 async onApply() {
   //this.seekerUpdate.field_id = this.selectedFieldId; //fetch the selected field id
   // this.seekerUpdate.seekerSkills = this.skills;
   // this.seekerUpdate.seekerSkills = this.skills;
   try {
     await this.seekerService.editseeker(this.seekerUpdate, this.user_id);
   } catch (error) {
     console.error('error updating profile', error);
   }
 }

 //Delete

 async onDelete(user_id: number) {
   try {
     await this.seekerService.deleteseeker(this.user_id).then(() => {
       this.seekerDetails = {} as Seeker;
     });
   } catch (error) {
     console.error('Error deleting seeker:', error);
   }
 }

}