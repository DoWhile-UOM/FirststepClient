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
    this.companyId = this.authService.getCompanyID();
    this.companyName = this.authService.getCompanyName();

    try {
      const data: EmployeeStats = await this.employeeService.getEmployeeStats(this.companyId);

      this.hraCount = data.hraCount;
      this.hrmCount = data.hrmCount;
      this.hraEvaluations = data.hraEvaluations;

      const columnColors = ['#008080', '#78bcc4', '#002c3e', '#e0f7fa', '#f9f9f9', '#e0e0e0', '#f7f8f3'];
      const performanceDataPoints = data.hraEvaluations.map((item: HraEvaluation) => ({
        label: item.hraName,
        y: item.assignedApplicationsWithRevisionsCount,
        color: columnColors[this.hraEvaluations.indexOf(item) % columnColors.length]
      }));

      this.columnChartOptions = {
        backgroundColor: 'white',
        exportEnabled: true,
        exportFileName: "Performance Chart",
        axisY: {
          labelFontFamily: 'Roboto',
          labelFontSize: 14,
          labelFontColor: '#666'
        },
        axisX: {
          labelFontFamily: 'Roboto',
          labelFontSize: 14,
          labelFontColor: '#666',
        },
        animationEnabled: true,
        data: [{
          type: 'column',
          dataPoints: performanceDataPoints
        }]
      };

      const doughnutColors = ['#004c6d', '#00CCCC'];
      this.doughnutChartOptions = {
        backgroundColor: 'white',
        exportEnabled: true,
        exportFileName: "Doughnut Chart",
        animationEnabled: true,
        data: [{
          type: 'doughnut',
          yValueFormatString: "#,###",
          indexLabel: "{name}",
          indexLabelFontFamily: 'Roboto',
          indexLabelFontSize: 14,
          indexLabelFontColor: '#666',
          dataPoints: [
            { y: data.hrmCount, name: "HRM", color: doughnutColors[0] },
            { y: data.hraCount, name: "TA Specialist", color: doughnutColors[1] }
          ]
        }]
      };

      this.cdr.detectChanges(); // Manually trigger change detection

    } catch (error) {
      console.error('Error fetching employee stats:', error); // Error handling
    }
  }
}