import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-advertisement-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './advertisement-header.component.html',
  styleUrl: './advertisement-header.component.css',
})
export class AdvertisementHeaderComponent implements OnInit{
  @Input() company_name: string = "";
  @Input() job_title: string = "";
  @Input() job_field: string = "";

  constructor() { }

  ngOnInit(): void {
    
  }
}
