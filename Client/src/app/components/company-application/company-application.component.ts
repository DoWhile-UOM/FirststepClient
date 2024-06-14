import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../../services/auth.service';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';

interface CompanyApplication {
  company_id: number;
  business_reg_no: number;
  company_name: string;
  verification_status: boolean;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  business_reg_certificate: string;
  certificate_of_incorporation: string;
  comment: string;
  verified_system_admin_id: number;
  company_business_scale: string;
}
interface EvaluatedCompanyDetails {
  company_id: number;
  verification_status: boolean;
  comment: string | null;
  company_registered_date: Date;
  verified_system_admin_id: number;
}
export interface DialogData {
  documentUrl: any;
  documentName: string;
  comment: string;
}

@Component({
  selector: 'app-company-application',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    CommonModule,
    SpinnerComponent,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './company-application.component.html',
  styleUrl: './company-application.component.css',
})
export class CompanyApplicationComponent implements OnInit {
  noOfCols: number = 2;
  evaluated_status: string = '';
  systemAdminID: number = 0; //temporary value
  companyID: number = 0;
  companyApplication: CompanyApplication = {} as CompanyApplication; // this is the object that will be used to store the company application details
  evaluatedCompanyDetails: EvaluatedCompanyDetails =
    {} as EvaluatedCompanyDetails;

  constructor(
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
  ) { }
  //getCompanyApplicationById
  // ngOnInit() {
  //   console.log('inside ngOnInit');
  //   this.route.params.subscribe((params) => {
  //     this.loadCompanyApplication(params['id']);
  //   });
  // }
  ngOnInit() {
    console.log('inside ngOnInit');
    this.route.params.subscribe((params) => {
      this.loadCompanyApplication(params['id']);
    });
    this.systemAdminID = Number(this.auth.getUserId());
  }

  async loadCompanyApplication(id: string) {
    this.companyID = +id;
    console.log('entered load in ts');
    try {
      console.log('entered try in ts');
      this.spinner.show();
      this.companyApplication =
        await this.companyService.getCompanyApplicationById(this.companyID);

      if (this.companyApplication.verified_system_admin_id !== 0) {
        this.evaluated_status = 'Evaluated';
      } else {
        this.evaluated_status = 'Not Evaluated';
      }
    } finally {
      this.spinner.hide();
    }
  }
  approve() {
    const dialogRef = this.dialog.open(CompanyApprovalConfirmationPopup);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Approval Confirmed') {
        this.companyApplication.verification_status = true; // denotes that the company is registered

        this.evaluatedCompanyDetails.verified_system_admin_id =
          this.systemAdminID; // denotes that the company is evaluated

        this.evaluatedCompanyDetails.company_id =
          this.companyApplication.company_id;
        this.evaluatedCompanyDetails.verification_status =
          this.companyApplication.verification_status;
        this.evaluatedCompanyDetails.comment = this.companyApplication.comment;
        this.evaluatedCompanyDetails.company_registered_date = new Date();
        this.updateEvaluatedStatus();
      } else {
        this.companyApplication.verification_status = false;
      }
    });
  }
  reject() {
    const dialogRef = this.dialog.open(CommentInCompanyEvaluation);

    dialogRef.afterClosed().subscribe((result) => {
      this.companyApplication.comment = result;
      if (
        this.companyApplication.comment &&
        this.companyApplication.comment != 'close'
      ) {
        this.evaluatedCompanyDetails.verified_system_admin_id =
          this.systemAdminID; // denotes that the company is evaluated
        this.evaluatedCompanyDetails.company_id =
          this.companyApplication.company_id;
        this.evaluatedCompanyDetails.verification_status =
          this.companyApplication.verification_status;
        this.evaluatedCompanyDetails.comment = this.companyApplication.comment;
        this.evaluatedCompanyDetails.company_registered_date = new Date();
        this.updateEvaluatedStatus();
      } else if (!this.companyApplication.comment) {
        this.dialog.open(CannotRejectWithoutCommentPopup);
      }
    });
  }
  async updateEvaluatedStatus() {
    try {
      this.spinner.show();
      await this.companyService.updateCompanyApplicationById(
        this.evaluatedCompanyDetails,
        this.companyID
      );
      this.evaluated_status = 'Evaluated';
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
    }
  }
  //go back to the company application list
  goBack() {
    this.router.navigate(['/sa/company-application']);
  }
  openBRCerti() {
    if (this.companyApplication.business_reg_certificate == null || this.companyApplication.business_reg_certificate == '') {
      this.dialog.open(EmptyPdfPopUp);
      return;
    }
    this.dialog.open(PdfViewComponent, {
      data: {
        documentUrl: this.companyApplication.business_reg_certificate,
        documentName: 'Business Registration Certificate',
      },
    });

  }
  openIncCerti() {
    if (this.companyApplication.certificate_of_incorporation == null || this.companyApplication.certificate_of_incorporation == '') {
      this.dialog.open(EmptyPdfPopUp);
      return;
    }
    this.dialog.open(PdfViewComponent, {
      data: {
        documentUrl: this.companyApplication.certificate_of_incorporation,
        documentName: 'Certificate of Incorporation',
      },
    });
  }
}

//comment-in-company-evaluation
@Component({
  selector: 'comment-in-company-evaluation',
  standalone: true,
  templateUrl: 'comment-in-company-evaluation.html',
  styleUrl: './company-application.component.css',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CommentInCompanyEvaluation {
  comment: string = '';

  constructor(public dialogRef: MatDialogRef<CommentInCompanyEvaluation>) { }

  closeDialog() {
    this.dialogRef.close(this.comment);
  }
  onNoClick() {
    this.dialogRef.close('close');
  }
}
//cannot-reject-without-comment-popup
@Component({
  selector: 'cannot-reject-without-comment-popup',
  standalone: true,
  templateUrl: 'cannot-reject-without-comment-popup.html',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CannotRejectWithoutCommentPopup { }

//comapany-approval-confirmation-popup
@Component({
  selector: 'company-approval-confirmation-popup',
  standalone: true,
  templateUrl: 'company-approval-confirmation-popup.html',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CompanyApprovalConfirmationPopup {
  constructor(
    public dialogRef: MatDialogRef<CompanyApprovalConfirmationPopup>
  ) { }

  closeDialog() {
    this.dialogRef.close('Approval Confirmed');
  }
  onNoClick() {
    this.dialogRef.close('Approval Cancelled');
  }
}
//empty-pdf-pop-up
@Component({
  selector: 'empty-pdf-pop-up',
  standalone: true,
  templateUrl: 'empty-pdf-pop-up.html',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class EmptyPdfPopUp { }