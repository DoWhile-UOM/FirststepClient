import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-company-admin-dashboard',
  standalone: true,
  imports: [MatCardModule, MatCard],
  templateUrl: './company-admin-dashboard.component.html',
  styleUrl: './company-admin-dashboard.component.css'
})
export class CompanyAdminDashboardComponent {

}
