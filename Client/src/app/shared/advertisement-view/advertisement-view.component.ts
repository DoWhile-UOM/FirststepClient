import { Component } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';

@Component({
  selector: 'app-advertisement-view',
  standalone: true,
  imports: [AdvertisementHeaderComponent],
  templateUrl: './advertisement-view.component.html',
  styleUrl: './advertisement-view.component.css'
})
export class AdvertisementViewComponent {

}
