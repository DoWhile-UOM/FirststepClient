import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ca-average-time',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './ca-average-time.component.html',
  styleUrl: './ca-average-time.component.css'
})
export class CaAverageTimeComponent implements OnInit {
  averageTimes: any;
  companyName: string | undefined;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const companyId = 7; // Hardcoded company ID
    this.companyName = "BISTEC Global Services"; // Hardcoded company name


    // const companyId = this.authService.getCompanyID();
    // this.companyName = this.authService.getCompanyName();

    if (companyId) {
      this.applicationService.getAverageTimes(companyId).then(data => {
        this.averageTimes = {
          avgResponseTime: Math.round(data.avgResponseTime * 100) / 100,
          avgScreeningTime: Math.round(data.avgScreeningTime * 100) / 100,
          avgCompletionTime: Math.round(data.avgCompletionTime * 100) / 100
        };
      }).catch(error => {
        console.error('Error fetching average times:', error);
      });
    }
  }
}