import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LogOutMenuComponent } from '../../components/log-out-menu/log-out-menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogOutMenuComponent,MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router:Router) { }
}

