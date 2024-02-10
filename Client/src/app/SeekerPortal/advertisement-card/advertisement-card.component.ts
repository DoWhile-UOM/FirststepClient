import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [ MatCardModule ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css'
})
export class AdvertisementCardComponent {

}
