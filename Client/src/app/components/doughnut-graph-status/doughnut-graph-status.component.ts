import { Component, Input, OnInit } from '@angular/core';
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
  @Input() companyId!: string;
  doughnutChartOptions: any;
  isLoading = true; // Flag to track loading state
 
  constructor(private applicationService: ApplicationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getApplicationStatusCount();
  }

  async getApplicationStatusCount() {
    try {
      const response: ApplicationStatusCount[] = await this.applicationService.getApplicationStatusCount(this.companyId);
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
      case 'active': return '#1DC9B7'; //teal
      case 'hold': return '#004c6d'; // light teal
      case 'interview': return '#17A2B8'; // cyan
      case 'closed': return '#0DCAF0'; // light blue
      default: return '#574476'; //  purple (default)
    }
  }
}