import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { RoleProfileEditComponent } from '../../components/role-profile-edit/role-profile-edit.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-sa-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule],
  templateUrl: './sa-nav-bar.component.html',
  styleUrl: './sa-nav-bar.component.css'
})
export class SaNavBarComponent {
  name: string = "System Admin";

  constructor(private dialog: MatDialog, private auth: AuthService) { 
    this.name = this.auth.getName();
  }

  onSignoutClick() {
    this.auth.signOut();
  }
  roleProfileEdit() {
    const dialogRef = this.dialog.open(RoleProfileEditComponent, {
      width: '500px',
      data: { id: Number(this.auth.getUserId()) }
    });
  }
}
