import { Component, Input, OnInit } from '@angular/core';
import { ViewAdvertisement } from '../../../models/view-advertisement';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-advertisement-view',
  standalone: true,
  templateUrl: './advertisement-view.component.html',
  styleUrl: './advertisement-view.component.css',
  imports: [MatButtonModule]
})
export class AdvertisementViewComponent implements OnInit{
  @Input() adData!: ViewAdvertisement;

  constructor() { }

  ngOnInit(): void {
    
  }
}
