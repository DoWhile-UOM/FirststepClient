import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-ca-average-time',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ca-average-time.component.html',
  styleUrl: './ca-average-time.component.css'
})
export class CaAverageTimeComponent implements OnInit {
  averageTimes: any;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    const companyId = 1; // Replace with the actual company ID
    this.applicationService.getAverageTimes(companyId).then(data => {
      this.averageTimes = data;
    });
  }
}