import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ApplicationService } from '../../../services/application.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApplicationStatusCount {
  status: string;
  count: number;
}

@Component({
  selector: 'app-doughnut-graph-status',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule],
  templateUrl: './doughnut-graph-status.component.html',
  styleUrls: ['./doughnut-graph-status.component.css']
})
export class DoughnutGraphStatusComponent implements OnInit {

  doughnutChartOptions: any;
  isLoading = true; // Flag to track loading state
  company_id: number = 7;

  constructor(private applicationService: ApplicationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getApplicationStatusCount();
  }

  async getApplicationStatusCount() {
    try {
      const response: ApplicationStatusCount[] = await this.applicationService.getApplicationStatusCount(this.company_id);
      const datapoints = response.map((data: ApplicationStatusCount) => ({
        y: data.count,
        name: data.status,
        color: this.getColor(data.status)
      }));

      this.doughnutChartOptions = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        data: [{
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###",
          dataPoints: datapoints
        }]

      };

      this.isLoading = false; // Data is ready
      this.cdr.detectChanges(); // Manually trigger change detection
      console.log('Application status count:', response);
    } catch (error) {
      console.error('Error fetching application status count:', error);
    }
  }

  getColor(status: string): string {
    switch (status) {
      case 'active': return 'red';
      case 'hold': return 'green';
      case 'interview': return 'orange';
      case 'closed': return 'blue';
      default: return 'black';
    }
  }
}