import { Component,OnInit,ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { JobfieldService } from '../../../services/jobfield.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';

interface Seeker {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  CVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  field_name?: string;  
  seekerSkills?: string[];
}
@Component({
  selector: 'app-seeker-profile-view',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatLabel, MatToolbar, MatButton, MatCard, MatCardContent, MatDivider, NgxSpinnerModule, SpinnerComponent, AddSkillsComponent,CommonModule],
  templateUrl: './seeker-profile-view.component.html',
  styleUrl: './seeker-profile-view.component.css'
})
export class SeekerProfileViewComponent implements OnInit {
  seekerDetails: Seeker = {} as Seeker;
  fields: any = [];
  skills: string[] = [];
  @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

  constructor(
    private seekerService: SeekerService,
    private jobFieldService: JobfieldService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}
  
  user_id: number = 2095;

  async ngOnInit() {
    this.spinner.show();
    try {
      // Fetch all job fields
      this.fields = await this.jobFieldService.getAll();

      // Fetch seeker profile data
      const seeker = await this.seekerService.getSeekerProfile(this.user_id);
      this.seekerDetails = seeker;

      // Fetch field name
      if (this.seekerDetails.field_id) {
        this.seekerDetails.field_name = await this.jobFieldService.getFieldNameById(this.seekerDetails.field_id);
      }
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to load profile details', 'Close', {
        duration: 3000,
      });
    } finally {
      this.spinner.hide();
    }
  }
}