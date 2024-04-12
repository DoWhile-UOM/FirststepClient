import { Component } from '@angular/core';
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
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
interface CompanyApplication {
  company_id: number;
  company_name: string;
  verification_status: boolean;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  business_reg_certificate: string;
  certificate_of_incorporation: string;
  comment: string;
}

@Component({
  selector: 'app-company-application',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    SpinnerComponent,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './company-application.component.html',
  styleUrl: './company-application.component.css',
})
export class CompanyApplicationComponent {
  noOfCols: number = 2;
  evaluated_staus: string = '';
  companyID = 7; // temporary company id
  companyApplication: CompanyApplication = {} as CompanyApplication; // this is the object that will be used to store the company application details

  constructor(
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private route: Router,public dialog: MatDialog
  ) {}
  //getCompanyApplicationById
  async ngOnInit() {
    try {
      this.spinner.show();
      this.companyApplication =
        await this.companyService.getCompanyApplicationById(this.companyID);
      if (this.companyApplication.verification_status == true) {
        this.evaluated_staus = 'Evaluated';
      } else {
        this.evaluated_staus = 'Not Evaluated';
      }
    } finally {
      this.spinner.hide();
    }
  }
  approve() {
    this.companyApplication.verification_status = true;
    this.evaluated_staus = 'Evaluated';
  }
  reject(){
    this.evaluated_staus = 'Not Evaluated';
    const dialogRef = this.dialog.open(CommentInCompanyEvaluation, {
      data: this.companyApplication.comment,
    });
    
  }
}

//comment-in-company-evaluation
@Component({
  selector: 'comment-in-company-evaluation',
  standalone: true,
  templateUrl: 'comment-in-company-evaluation.html',
  imports: [MatFormFieldModule, FormsModule, MatButtonModule],
})
export class CommentInCompanyEvaluation {
  companyApplication: CompanyApplication = {} as CompanyApplication;
}
