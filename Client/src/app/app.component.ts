import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bars/nav-bar/nav-bar.component';
import { CaNavBarComponent } from './nav-bars/ca-nav-bar/ca-nav-bar.component';
import { HrManagerNavBarComponent } from './nav-bars/hr-manager-nav-bar/hr-manager-nav-bar.component';
import { SaNavBarComponent } from './nav-bars/sa-nav-bar/sa-nav-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavBarComponent, CaNavBarComponent, HrManagerNavBarComponent, SaNavBarComponent ]
})
export class AppComponent {
  url = this.router.url;
  
  constructor (private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
  });
  }
}