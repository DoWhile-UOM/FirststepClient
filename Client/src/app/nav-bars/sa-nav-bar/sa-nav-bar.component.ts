import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sa-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './sa-nav-bar.component.html',
  styleUrl: './sa-nav-bar.component.css'
})
export class SaNavBarComponent {
  selected: number = 2;
  colorList = ['black', 'back', 'black', 'black']

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.colorList.forEach(element => {
      element = 'black';
    });
    
    this.colorList[this.selected] = 'primary';
  }
}
