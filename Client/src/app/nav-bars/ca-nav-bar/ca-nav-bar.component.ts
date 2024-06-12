import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleProfileEditComponent } from '../../components/role-profile-edit/role-profile-edit.component';
@Component({
  selector: 'app-ca-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule],
  templateUrl: './ca-nav-bar.component.html',
  styleUrl: './ca-nav-bar.component.css'
})
export class CaNavBarComponent {
  name: string = "Company Admin";
  company: string = "Company Name";

  constructor(private auth: AuthService, private dialog: MatDialog) {
    this.name = this.auth.getName();
    this.company = this.auth.getCompanyName();
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
