import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-application-list',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './company-application-list.component.html',
  styleUrl: './company-application-list.component.css',
})
export class CompanyApplicationListComponent {
  constructor(private snackBar: MatSnackBar) {}
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
