import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

interface DailyInterviewCount {
  date: string;
  booked: number;
  completed: number;
  missed: number;
}

interface InterviewStat {
  interviewCountPerDay: DailyInterviewCount[];
  isCalledPercentage: number;
}

@Component({
  selector: 'app-ca-interview-stat',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, MatCardModule],
  templateUrl: './ca-interview-stat.component.html',
  styleUrl: './ca-interview-stat.component.css'
})
export class CaInterviewStatComponent implements OnInit {
  chartOptions: any;
  isCalledPercentage: number = 0;
  companyId!: number;
  isLoaded: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.companyId = this.authService.getCompanyID();

    try {
      const data: InterviewStat = await this.appointmentService.getInterviewStat(this.companyId);
      console.log('Fetched data:', data); // Debug: Check if data is fetched

      this.isCalledPercentage = data.isCalledPercentage;

      const interviewDataPoints = data.interviewCountPerDay.map((day: DailyInterviewCount) => ({
        x: new Date(day.date),
        y: [day.completed, day.missed]
      }));

      console.log('Processed data points:', interviewDataPoints); // Debug: Check processed data points

      this.chartOptions = {
        animationEnabled: true,
        exportEnabled: true,
        exportFileName: "Daily Number of Interviews",
        axisX: {
          valueFormatString: "DD MMM"
        },
        axisY: {
          title: "Number of Interviews",
          includeZero: false
        },
        data: [
          {
            type: "stackedColumn",
            name: "Completed",
            showInLegend: "true",
            color: "#004c6d", // Teal color for completed
            dataPoints: interviewDataPoints.map(d => ({ x: d.x, y: d.y[0] }))
          },
          {
            type: "stackedColumn",
            name: "Missed",
            showInLegend: "true",
            color: "#00CCCC", // Darker teal color for missed
            dataPoints: interviewDataPoints.map(d => ({ x: d.x, y: d.y[1] }))
          }
        ]
      };

      this.isLoaded = true; // Set isLoaded to true after data is processed
      this.cdr.detectChanges(); // Manually trigger change detection
    } catch (error) {
      console.error('Error fetching interview stats:', error); // Error handling
    }
  }

  downloadChart() {
    if (this.chartOptions) {
      this.chartOptions.exportFileName = "Daily Number of Interviews";
      this.chartOptions.exportEnabled = true;
    }
  }
}