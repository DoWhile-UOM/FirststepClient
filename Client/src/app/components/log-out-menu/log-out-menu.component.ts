import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-log-out-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './log-out-menu.component.html',
  styleUrl: './log-out-menu.component.css'
})
export class LogOutMenuComponent {

  constructor(private authService: AuthService) { }

  signOut() {
    this.authService.signOut()
    //this.auth.signup(this.myForm.value)
  }


}

