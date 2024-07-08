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
  selector: 'app-tas-nav-bar',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule],
  templateUrl: './tas-nav-bar.component.html',
  styleUrl: './tas-nav-bar.component.css'
})
export class TasNavBarComponent {
  name: string = "Talent Acquisition Specialist";
  company: string = "My Company";

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
      data: { id: 10 }
    });
  }
}
