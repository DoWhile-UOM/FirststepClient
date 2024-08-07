import { Component, HostListener } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule
  ],
})
export class LandingPageComponent {
  screenWidth: number = 0;
  selectedToggle: string = 'jobSeeker';

  constructor(private router: Router) {
    this.getScreenSize();
  }

  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  comReg(){
    this.router.navigate(['/CompanyReg']);
  }

  onToggleChange(toggle: string) {
    this.selectedToggle = toggle;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: undefined) {
    try{
      this.screenWidth = window.innerWidth;
    }
    catch {}
  }
}
