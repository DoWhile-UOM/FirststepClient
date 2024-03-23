import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ca-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule],
  templateUrl: './ca-nav-bar.component.html',
  styleUrl: './ca-nav-bar.component.css'
})
export class CaNavBarComponent {
  selected: number = 2;
  colorList = ['black', 'back', 'black', 'black']

  constructor() { }

  ngOnInit(): void {
    this.colorList.forEach(element => {
      element = 'black';
    });
    
    this.colorList[this.selected] = 'primary';
  }
}
