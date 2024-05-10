import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationService } from '../../../services/application.service';

export interface HRManagerApplicationListDto {
  application_Id: number;
  seekerName: string;
  status: string;
  is_evaluated: boolean;
  assigned:string;
  submitted_date: Date;
}

@Component({
  selector: 'app-hr-manager-application-listing',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatSortModule, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatChipsModule, FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbar, MatIcon, MatLabel, MatSelectModule],
  templateUrl: './hr-manager-application-listing.component.html',
  styleUrl: './hr-manager-application-listing.component.css'
})
export class HrManagerApplicationListingComponent {

}
