import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-advertisement-actions',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './advertisement-actions.component.html',
  styleUrl: './advertisement-actions.component.css'
})
export class AdvertisementActionsComponent {
  icon: string = 'bookmark_border'; // bookmark
}
