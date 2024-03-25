import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    NavBarComponent,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class LandingPageComponent {
  selected: number = 0;
  colorList = ['primary', 'back', 'black', 'black'];

  constructor() {}

  ngOnInit(): void {
    this.colorList.forEach((element) => {
      element = 'black';
    });

    this.colorList[this.selected] = 'primary';
  }
}
