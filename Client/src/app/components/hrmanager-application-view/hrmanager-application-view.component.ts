import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/application.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RevisionService } from '../../../services/revision.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatChipsModule } from '@angular/material/chips';

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
  imports: [
    MatIconModule,
    MatButtonModule,
    MatLabel,
    MatToolbar,
    MatButton,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    SpinnerComponent,
    MatChipsModule,
  ],
  templateUrl: './hrmanager-application-view.component.html',
  styleUrls: ['./hrmanager-application-view.component.css'],
})
export class HrmanagerApplicationViewComponent implements OnInit {
  @Input() showComments: boolean = true; // Accepts showComments as input
  @Input() applicationId: number = 0;
  applicationDetails: ApplicationViewDto = {} as ApplicationViewDto;
  loading: boolean = true;
  error: string | null = null;
  newComment: string = '';
  userRole: string = '';
  userName: string = '';
  userID: number = 0;
  isEditingComment: boolean = false;
  currentRevisionId: number | null = null;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private dialog: MatDialog,
    private acRouter: ActivatedRoute,
    private router: Router,
    private revisionService: RevisionService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    this.userID = this.authService.getUserId();
    this.userRole = this.authService.getRole();
    this.userName = this.authService.getName();

    this.spinner.show();

    try {
      this.applicationId = Number(
        this.acRouter.snapshot.paramMap.get('applicationId')
      );
    } catch {
      this.router.navigate(['/notfound']);
    }

    await this.fetchApplicationDetails();

    this.spinner.hide();
  }

  async fetchApplicationDetails() {
    try {
      this.applicationDetails =
        await this.applicationService.getApplicationDetails(this.applicationId);
    } catch (error) {
      this.error = 'Error fetching application details';
    } finally {
      this.loading = false;
    }
  }

  // Function to open the pdf
  openpdf() {
    this.dialog.open(PdfViewComponent, {
      data: {
        //pass cv name to pdf view component
        documentUrl: this.applicationDetails.cVurl,
      },
    });
  }

  async changeDecision(newStatus: string) {
    if (
      (newStatus === 'Rejected' || newStatus === 'Pass') &&
      !this.newComment.trim()
    ) {
      if (newStatus === 'Rejected') {
        this.showAlertDialog(
          'Alert',
          'Comment is mandatory when rejecting an application'
        );
      } else if (newStatus === 'Pass') {
        this.showAlertDialog(
          'Alert',
          'Please state the reason for passing the application. This will be directed to an HR Manager'
        );
      }
      return;
    }

    if (newStatus === 'Pass' && this.userRole !== 'hra') {
      return;
    }

    if (newStatus === 'Accepted') {
      await this.showAcceptDialog(newStatus);
    } else if (newStatus === 'Rejected') {
      await this.showRejectDialog(newStatus);
    } else if (newStatus === 'Pass') {
      await this.handlePassDecision(newStatus);
    }
  }

  shouldShowChangeDecision(): boolean {
    if (
      this.userRole === 'hra' &&
      this.applicationDetails.last_revision &&
      (this.applicationDetails.last_revision.role === 'hrm' ||
        this.applicationDetails.last_revision.role === 'ca')
    ) {
      return false;
    }
    return true;
  }

  showProfile(){
    this.router.navigate([this.authService.getRole() + '/profile-view', {seeker: this.applicationDetails.seeker_id}]);
  }

  showAlertDialog(title: string, message: string): void {
    this.dialog.open(AlertDialog, {
      width: '300px',
      data: { title: title, message: message },
    });
  }

  async handlePassDecision(newStatus: string) {
    try {
      await this.revisionService.addRevision(
        this.applicationId,
        this.newComment,
        newStatus,
        this.userID,
        this.userName!,
        this.userRole!
      );

      await this.fetchApplicationDetails();
      this.showAlertDialog('Success', 'Application was Passed');
    } catch (error) {
      this.snackBar
        .open(`Error changing decision to ${newStatus}:` + error, '', {
          panelClass: ['app-notification-eror'],
        })
        ._dismissAfter(3000);
    }
  }

  async showAcceptDialog(newStatus: string) {
    const dialogRef = this.dialog.open(AcceptDialog, {
      width: '300px',
      data: { message: 'Application was Accepted' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.revisionService.addRevision(
            this.applicationId,
            this.newComment,
            newStatus,
            this.userID,
            this.userName,
            this.userRole
          );
          await this.fetchApplicationDetails();
          this.showAlertDialog('Success', 'Application was Accepted');
        } catch (error) {
          this.snackBar
            .open(`Error changing decision to ${newStatus}:` + error, '', {
              panelClass: ['app-notification-eror'],
            })
            ._dismissAfter(3000);
        }
      }
    });
  }

  async showRejectDialog(newStatus: string) {
    const dialogRef = this.dialog.open(RejectDialog, {
      width: '300px',
      data: { message: 'Are you sure you want to reject this application?' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.revisionService.addRevision(
            this.applicationId,
            this.newComment,
            newStatus,
            this.userID,
            this.userName!,
            this.userRole!
          );
          await this.fetchApplicationDetails();
          this.showAlertDialog('Success', 'Application was Rejected');
        } catch (error) {
          this.snackBar
            .open(`Error changing decision to ${newStatus}:` + error, '', {
              panelClass: ['app-notification-eror'],
            })
            ._dismissAfter(3000);
        }
      }
    });
  }

  async viewCommentHistory() {
    const dialogRef = this.dialog.open(CommentHistoryDialog, {
      width: '1000px',
      minHeight: '450px',
      data: await this.revisionService.getRevisionHistory(this.applicationId),
    });
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
        return role;
    }
  }

  onBackButtonClick() {
    window.history.back();
  }
}

@Component({
  selector: 'accept-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './accept-dialog.html',
})
export class AcceptDialog {
  constructor(
    public dialogRef: MatDialogRef<AcceptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'reject-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './reject-dialog.html',
})
export class RejectDialog {
  constructor(
    public dialogRef: MatDialogRef<RejectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'comment-history-dialog',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
  ],
  templateUrl: './comment-history-dialog.html',
  styleUrls: ['./comment-history-dialog.css'],
})
export class CommentHistoryDialog {
  constructor(
    public dialogRef: MatDialogRef<CommentHistoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getRoleDisplayName(role: string): string {
    switch (role) {
      case 'hra':
        return 'HR Assistant';
      case 'ca':
        return 'Company Admin';
      case 'hrm':
        return 'HR Manager';
      default:
        return role;
    }
  }
}

@Component({
  selector: 'alert-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onOkClick()">OK</button>
    </mat-dialog-actions>
  `,
})
export class AlertDialog {
  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
