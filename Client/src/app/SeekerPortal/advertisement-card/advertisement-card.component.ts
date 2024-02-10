import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementActionsComponent } from '../advertisement-actions/advertisement-actions.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [ MatCardModule, AdvertisementActionsComponent, MatButtonModule ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css'
})
export class AdvertisementCardComponent {

}
