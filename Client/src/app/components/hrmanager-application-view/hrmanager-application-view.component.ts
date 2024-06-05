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
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RevisionService } from '../../../services/revision.service';


interface Revision {
  revision_id: number;
  comment: string;
  status: string;
  created_date: string;
  employee_id: number;
  name: string;
  role: string;

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
  loading: boolean = true;
  error: string | null = null;
  newComment: string = '';
  userRole: string | null = null;
  userName: string | null = null;

  constructor(private applicationService: ApplicationService,private authService: AuthService,    public dialog: MatDialog ,private revisionService: RevisionService
  ) {}

  async ngOnInit() {
    this.userRole = this.authService.getRole();
    this.userName = this.authService.getName();
    await this.fetchApplicationDetails();
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
        // const status = this.applicationDetails.is_evaluated ? this.applicationDetails.last_revision.status : 'Not Evaluated';
        const employeeId = Number(this.authService.getUserId()); // Ensure this is correctly fetched from AuthService
        await this.revisionService.addRevision(this.applicationId, this.newComment, status, employeeId);
        await this.fetchApplicationDetails();
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }

  async viewCommentHistory() {
    try {
      const revisionHistory = await this.revisionService.getRevisionHistory(this.applicationId);
      console.log('Revision History:', revisionHistory);
    } catch (error) {
      console.error('Error fetching revision history:', error);
    }
  }

  async changeDecision(newStatus: string) {
    try {
      const employeeId = Number(this.authService.getUserId());
      await this.revisionService.addRevision(this.applicationId, this.newComment, newStatus, employeeId);
      await this.fetchApplicationDetails();
    } catch (error) {
      console.error('Error changing decision:', error);
    }
  }

  getRoleDisplayName(role: string): string {
    switch (role) {
      case 'hra':
        return 'HR Assistant';
      case 'ca':
        return 'Company Admin';
      case 'hrm':
        return 'HR Manager';
      default:
        return role; // Fallback to the original role if not matched
    }
  }
  

}
