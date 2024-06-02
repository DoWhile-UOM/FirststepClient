import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
//import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/application.service';
import { FormsModule } from '@angular/forms';

interface Revision {
  revision_id: number;
  comment: string;
  status: string;
  created_date: string;
  employee_id: number;
}

interface ApplicationViewDto {
  application_Id: number;
  submitted_date: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  current_status: string;
  is_evaluated: boolean;
  last_revision: Revision;
}

@Component({
  selector: 'app-hrmanager-application-view',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatLabel, MatToolbar, MatButton, CommonModule, FormsModule],
  templateUrl: './hrmanager-application-view.component.html',
  styleUrls: ['./hrmanager-application-view.component.css'],
})
export class HrmanagerApplicationViewComponent implements OnInit {
  @Input() showComments: boolean = true; // Accepts showComments as input
  @Input() applicationId: number = 2; // Default value for testing
  applicationDetails: ApplicationViewDto = {} as ApplicationViewDto;
  loading: boolean = true;
  error: string | null = null;
  newComment: string = '';


  constructor(private applicationService: ApplicationService) {}

  async ngOnInit() {
    this.fetchApplicationDetails();
  }

  async fetchApplicationDetails() {
    try {
      this.applicationDetails = await this.applicationService.getApplicationDetails(this.applicationId);
    } catch (error) {
      this.error = 'Error fetching application details';
    } finally {
      this.loading = false;
    }
  }

  async addComment() {
    if (this.newComment.trim()) {
      try {
        // Assuming the application service has a method to add a comment
        await this.applicationService.addComment(this.applicationId, this.newComment);
        this.applicationDetails.last_revision.comment = this.newComment;
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }

}
