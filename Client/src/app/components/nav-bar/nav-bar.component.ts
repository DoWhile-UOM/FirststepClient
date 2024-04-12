import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LogOutMenuComponent } from '../log-out-menu/log-out-menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule,MatToolbarModule,MatButtonModule,LogOutMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  selected: number = 0;
  colorList = ['black', 'back', 'black', 'black']

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.colorList.forEach(element => {
      element = 'black';
    });

    if (this.router.url === 'seeker/home') {
      this.selected = 0;
    }
    else if (this.router.url === 'seeker/home/saved'){
      this.selected = 1;
    }
    
    this.colorList[this.selected] = 'primary';
  }

  navigateToSavedListPage() {
    this.router.navigate(['seeker/home/saved']);
  }

  navigateToHomePage() {
    this.router.navigate(['seeker/home']);
  }
}

