import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sa-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule],
  templateUrl: './sa-nav-bar.component.html',
  styleUrl: './sa-nav-bar.component.css'
})
export class SaNavBarComponent {
  selected: number = 2;
  colorList = ['black', 'back', 'black', 'black']

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.colorList.forEach(element => {
      element = 'black';
    });

    this.colorList[this.selected] = 'primary';
  }
  onSignoutClick() {
    this.auth.signOut();
  }
}
