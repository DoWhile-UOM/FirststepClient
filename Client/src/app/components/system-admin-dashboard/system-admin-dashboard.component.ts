import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-system-admin-dashboard',
  standalone: true,
  imports: [ CommonModule, DashboardLayoutModule ],
  templateUrl: './system-admin-dashboard.component.html',
  styleUrl: './system-admin-dashboard.component.css',
})
export class SystemAdminDashboardComponent {
  cellSpacing: number[] = [10, 10];
}
