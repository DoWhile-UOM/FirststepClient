import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface SeekerProfileViewDto {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  user_id: number;
  cVurl: string;
  field_name?: string;
  seekerSkills?: string[];
}

@Component({
  selector: 'app-seeker-profile-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatLabel,
    MatToolbar,
    MatButton,
    MatCard,
    MatCardContent,
    MatDivider,
    NgxSpinnerModule,
    SpinnerComponent,
    AddSkillsComponent,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './seeker-profile-view.component.html',
  styleUrls: ['./seeker-profile-view.component.css']
})

export class SeekerProfileViewComponent implements OnInit {

  seekerDetails: SeekerProfileViewDto = {} as SeekerProfileViewDto;
  fields: any = [];
  skills: string[] = [];
  @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

  constructor(
    private seekerService: SeekerService,
    private jobFieldService: JobfieldService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private acRouter: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  user_id: number = 0;

  async ngOnInit() {
    this.spinner.show();

    try {
      this.user_id = Number(this.acRouter.snapshot.paramMap.get('seeker'))

      // Fetch all job fields
      this.fields = await this.jobFieldService.getAll();

      // Fetch seeker profile data
      this.seekerDetails = await this.seekerService.getSeekerProfile(this.user_id);

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

  openpdf() {
    this.dialog.open(PdfViewComponent,{
      data: {
      //pass cv name to pdf view component
      documentUrl: this.seekerDetails.cVurl
      },
    });
  }

  onBackButtonClick(){
    window.history.back();
  }
}
