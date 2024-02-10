import { Component } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';

@Component({
  selector: 'app-seeker-home-page',
  standalone: true,
  imports: [ AdvertisementCardComponent ],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})
export class SeekerHomePageComponent {

}
