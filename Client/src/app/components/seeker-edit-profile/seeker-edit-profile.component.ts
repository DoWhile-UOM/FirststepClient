import { Component, OnInit,ViewChild } from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {FormControl, Validators,ReactiveFormsModule} from '@angular/forms';
import { SeekerService } from '../../../services/seeker.service';
import { SkillService } from '../../../services/skill.service';
import { JobfieldService } from '../../../services/jobfield.service';


// seeker edit profile interface
interface job_field {
  field_name: string;
  field_id: number;
}

interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number,
  bio: string,
  description: string,
  university: string,
  cVurl: string,
  profile_picture: string,
  linkedin: string,  
  field_id: any,
  user_id: number,
  password_hash: string,
  job_Field:any,
  job_field_name:string
  seekerSkills: string[],
}

interface updateSeeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number,
  bio: string,
  description: string,
  university: string,
  cVurl: string,
  profile_picture: string,
  linkedin: string,  
  field_id: string,
  user_id: number,
  password_hash: string,
  seekerSkills: string[],
  //other
  job_field: string[],
}




@Component({
    selector: 'app-seeker-edit-profile',
    standalone: true,
    templateUrl: './seeker-edit-profile.component.html',
    styleUrl: './seeker-edit-profile.component.css',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSlideToggleModule, MatToolbarModule, FormsModule, MatSelectModule, AddSkillsComponent, NavBarComponent]
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

  constructor(private seekerService: SeekerService,private jobFieldService: JobfieldService ) {}
  user_id: number = 1089;

  fields: job_field[] = [];

  async ngOnInit() {
    await this.fetchSeekerDetails();

    //console.log(this.data);
    await this.jobFieldService.getAll().then((response) => {
      this.fields = response;
      //console.log(this.fields);
    });
    this.seekerDetails.job_field_name=this.fields[this.seekerDetails.field_id]['field_name'];

  }
  async ngAfterViewInit() {
    this.skills = this.addSkillsComponent.skills;
  }
  data(data: any) {
    throw new Error('Method not implemented.');
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

  changeSkillsArray($event: Event){
		var skills = $event;
		if (skills != null){
			this.skills = skills as unknown as string[];
		}
		alert("Skills: " + this.skills);
	}


  //update
  async onApply() {
    try{    
      await this.seekerService.editseeker( this.seekerDetails , this.user_id);
    } catch (error) {
      console.error('error updating profile',error);
    }
  }

  //Delete

  async onDelete(user_id: number){
    try{
       await this.seekerService.deleteseeker(this.user_id)
       .then(() => {
        this.seekerDetails = {} as Seeker; // This effectively clears the form.
    })
    }
    catch(error){
      console.error('Error deleting seeker:', error);
    }
  }

  

}
