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


interface seekerData {
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  university: string;
  cVurl: string;
  linkedin: string; 
  //field_name: string,
  bio: string;
  description: string;
  profile_picture: string;
  password_hash: string; //pop up
  
}


@Component({
    selector: 'app-seeker-signup',
    standalone: true,
    templateUrl: './seeker-signup.component.html',
    styleUrl: './seeker-signup.component.css',
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatToolbar, FileUploadComponent, JobOfferListComponent, AddSkillsComponent]
})


export class SeekerSignupComponent implements OnInit{

  //default image for the profile picture
url = './assets/images/SeekerEdit.jpg';

//function to select the file
onselectFile(event: any) {
  if (event.target.files) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  }
}

//form groups for the seeker
firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});
thirdFormGroup = this._formBuilder.group({
  thirdCtrl: ['', Validators.required],
});
fourthFormGroup = this._formBuilder.group({
  fourthCtrl: ['', Validators.required],
});
fifthFormGroup = this._formBuilder.group({
  fifthCtrl: ['', Validators.required],
});

//Inject seeker service
constructor(private _formBuilder: FormBuilder ,private seekerService: SeekerService) {}



ngOnInit(): void {
}


//new
async submitForm() {
  const seekerData = {
    first_name: this.firstFormGroup.value.firstCtrl,
    last_name: this.firstFormGroup.value.firstCtrl,
    phone_number: this.firstFormGroup.value.firstCtrl,
    email: this.secondFormGroup.value.secondCtrl,
    university: this.thirdFormGroup.value.thirdCtrl,
    cVurl: this.thirdFormGroup.value.thirdCtrl,
    linkedin: this.thirdFormGroup.value.thirdCtrl,
    bio:this.fifthFormGroup.value.fifthCtrl,
    description: this.fifthFormGroup.value.fifthCtrl
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
