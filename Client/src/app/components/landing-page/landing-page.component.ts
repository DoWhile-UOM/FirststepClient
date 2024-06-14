import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  comReg(){
    this.router.navigate(['/CompanyReg']);
  }
}
