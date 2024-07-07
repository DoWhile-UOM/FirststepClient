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

      this.hraCount = data.hraCount;
      this.hrmCount = data.hrmCount;
      this.hraEvaluations = data.hraEvaluations;

      const columnColors = [ '#1DC9B7', '#FD3995', '#39A1F4', '#F5A623', '#00CCCC', '#0DCAF0', '#17A2B8','#1A55E3', '#FF0854', '#00D284', '#0DCAF0', '#5E6EED', '#6F42C1', '#007BFF'];
      const performanceDataPoints = data.hraEvaluations.map((item: HraEvaluation) => ({
        label: item.hraName,
        y: item.assignedApplicationsWithRevisionsCount,
        color: columnColors[this.hraEvaluations.indexOf(item) % columnColors.length]      }));


        this.columnChartOptions = {
          axisY: {
            labelFontFamily: 'Roboto',
            labelFontSize: 14,
            labelFontColor: '#666'
          },
          axisX: {
            labelFontFamily: 'Roboto',
            labelFontSize: 14,
            labelFontColor: '#666',
            labelFormatter: () => ''
          },
          animationEnabled: true,
          data: [{
            type: 'column',
            dataPoints: performanceDataPoints
          }]
        };

        const doughnutColors = ['#451CC9', '#A1C91C'];        
        this.doughnutChartOptions = {
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