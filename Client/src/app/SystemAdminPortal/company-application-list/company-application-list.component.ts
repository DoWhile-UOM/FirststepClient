import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-application-list',
  standalone: true,
  imports: [MatChipsModule, MatCardModule],
  templateUrl: './company-application-list.component.html',
  styleUrl: './company-application-list.component.css',
})
export class CompanyApplicationListComponent {
  jobListLength: number = 0;
  constructor(private snackBar: MatSnackBar) {
    this.jobListLength = 1;
  }
  filter(selected: any) {
    //filter by status of the company list
    this.snackBar
      .open(
        'Refreshing table to show ' + selected.value + 'company list ',
        '',
        { panelClass: ['app-notification-normal'] }
      )
      ._dismissAfter(3000);
  }
}
