import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule, LottieComponent
  ],
})
export class LandingPageComponent {
  options: AnimationOptions = {
    path: 'assets/lottie/checkmark.json',
  };

  constructor(private router: Router) { }

  

  login() {
    this.router.navigate(['/login']);
  }

  animationCreated(animationItem: AnimationItem): void {
  }
}
