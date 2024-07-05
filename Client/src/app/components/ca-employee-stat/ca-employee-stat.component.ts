import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';

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
  companyId!: number
  companyName!: string;

  constructor(private employeeService: EmployeeService , private authService: AuthService) { }

  ngOnInit() {
    //test
    this.companyId = 7;
    this.companyName = "BISTEC Global Services";

    //this.companyId = this.authService.getCompanyID();
    //this.companyName = this.authService.getCompanyName();

    // Fetch employee stats using company ID
    this.employeeService.getEmployeeStats(this.companyId).then(data => {
      const performanceDataPoints = data.hraEvaluations.map((item: any) => ({
        label: item.hraName,
        y: item.assignedApplicationsWithRevisionsCount
      }));

      this.columnChartOptions = {
        title: {
          text: 'HRA Performance'
        },
        animationEnabled: true,
        data: [{
          type: 'column',
          dataPoints: performanceDataPoints
        }]
      };

      this.doughnutChartOptions = {
        title: {
          text: 'HRM and HRA Count'
        },
        animationEnabled: true,
        data: [{
          type: 'doughnut',
          yValueFormatString: "#,###",
          indexLabel: "{name}",
          dataPoints: [
            { y: data.hrmCount, name: "HRM" },
            { y: data.hraCount, name: "HRA" }
          ]
        }]
      };
    });
  }
}