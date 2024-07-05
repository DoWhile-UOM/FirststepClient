import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

interface HraEvaluation {
  hraName: string;
  assignedApplicationsWithRevisionsCount: number;
}

interface EmployeeStats {
  hraCount: number;
  hrmCount: number;
  hraEvaluations: HraEvaluation[];
}

@Component({
  selector: 'app-ca-employee-stat',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './ca-employee-stat.component.html',
  styleUrl: './ca-employee-stat.component.css'
})
export class CaEmployeeStatComponent implements OnInit {
  columnChartOptions: any;
  doughnutChartOptions: any;
  companyId!: number;
  companyName!: string;

  hraCount!: number;
  hrmCount!: number;
  hraEvaluations: HraEvaluation[] = [];

  constructor(private employeeService: EmployeeService , private authService: AuthService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    //test
    this.companyId = 7;
    this.companyName = "BISTEC Global Services";

    //this.companyId = this.authService.getCompanyID();
    //this.companyName = this.authService.getCompanyName();

    try {
      const data: EmployeeStats = await this.employeeService.getEmployeeStats(this.companyId);
      console.log('Employee Stats:', data); // Debugging line

      this.hraCount = data.hraCount;
      this.hrmCount = data.hrmCount;
      this.hraEvaluations = data.hraEvaluations;

      const performanceDataPoints = data.hraEvaluations.map((item: HraEvaluation) => ({
        label: item.hraName,
        y: item.assignedApplicationsWithRevisionsCount
      }));

      console.log('Performance Data Points:', performanceDataPoints); // Debugging line

      this.columnChartOptions = {
        title: {
          text: ''
        },
        animationEnabled: true,
        data: [{
          type: 'column',
          dataPoints: performanceDataPoints
        }]
      };

      console.log('Column Chart Options:', this.columnChartOptions); // Debugging line

      this.doughnutChartOptions = {
        title: {
          text: ''
        },
        animationEnabled: true,
        data: [{
          type: 'doughnut',
          yValueFormatString: "#,###",
          indexLabel: "{name}",
          dataPoints: [
            { y: data.hrmCount, name: "HRM" },
            { y: data.hraCount, name: "TA Specialist" }
          ]
        }]
      };

      console.log('Doughnut Chart Options:', this.doughnutChartOptions); // Debugging line

      this.cdr.detectChanges(); // Manually trigger change detection

    } catch (error) {
      console.error('Error fetching employee stats:', error); // Error handling
    }
  }
}