import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LogOutMenuComponent } from '../../components/log-out-menu/log-out-menu.component';

@Component({
  selector: 'app-ca-nav-bar',
  standalone: true,
  imports: [LogOutMenuComponent,MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './ca-nav-bar.component.html',
  styleUrl: './ca-nav-bar.component.css'
})
export class CaNavBarComponent {
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
