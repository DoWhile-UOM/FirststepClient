import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

interface ProfileDetails{
  user_id: number;
  first_name: string;
  last_name: string;
  company_name: string;
}

@Component({
  selector: 'app-hr-manager-nav-bar',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './hr-manager-nav-bar.component.html',
  styleUrl: './hr-manager-nav-bar.component.css',
})
export class HrManagerNavBarComponent {
  profileDetails: ProfileDetails = {
    user_id: 1072,
    first_name: 'Isuranga',
    last_name: 'Warnasooriya',
    company_name: 'Bistec Global Services',
  };
  constructor(private router: Router) {}

}
