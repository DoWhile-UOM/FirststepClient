import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/application.service';
import { Router } from '@angular/router';
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
  seeker_id: number;
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
  revisionHistory: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  newComment: string = '';


  constructor(private applicationService: ApplicationService ,  private router: Router) {}

  async ngOnInit() {
    this.fetchApplicationDetails();
  }

  async fetchApplicationDetails() {
    try {
      this.applicationDetails = await this.applicationService.getApplicationDetails(this.applicationId);
      console.log('Application details:', this.applicationDetails); // Debugging statement
    } catch (error) {
      this.error = 'Error fetching application details';
    } finally {
      this.loading = false;
    }
  }

  async fetchRevisionHistory() {
    try {
      this.revisionHistory = await this.applicationService.getRevisionHistory(this.applicationId);
    } catch (error) {
      this.error = 'Error fetching revision history';
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


  viewProfile() {
    console.log('Seeker ID:', this.applicationDetails.seeker_id); // Debugging statement
    if (this.applicationDetails && this.applicationDetails.seeker_id) {
      this.router.navigate(['jobOfferList/applicationList/applicationView/seekerProfileView', this.applicationDetails.seeker_id]);
    } else {
      console.error('Seeker ID is undefined or null');
    }
  }
  
}
