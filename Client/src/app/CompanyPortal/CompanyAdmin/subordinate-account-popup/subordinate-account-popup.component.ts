import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-subordinate-account-popup',
  standalone: true,
  imports: [MatCheckboxModule,MatButtonModule,MatIconModule],
  templateUrl: './subordinate-account-popup.component.html',
  styleUrl: './subordinate-account-popup.component.css'
})
export class SubordinateAccountPopupComponent {

}
