import { Component, HostListener } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, CommonModule, MatButtonModule, RouterModule, MatIconModule, MatMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  name: string = "User";
  screenWidth: number = 0;

  constructor(private router: Router, private auth: AuthService) { 
    this.name = this.auth.getName();
    this.getScreenSize()
  }

  onSignoutClick() {
    this.auth.signOut();
  }

  onProfileClick(){
    this.router.navigate(['seeker/profile-edit']);
  }

  onClick(path : string){
    this.router.navigate([path]);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: undefined) {
    try{
      this.screenWidth = window.innerWidth;
    }
    catch {}
  }
}

