import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-application-listing-page',
  standalone: true,
  imports: [MatToolbar,MatIcon,MatLabel],
  templateUrl: './application-listing-page.component.html',
  styleUrl: './application-listing-page.component.css'
})
export class ApplicationListingPageComponent {

}
