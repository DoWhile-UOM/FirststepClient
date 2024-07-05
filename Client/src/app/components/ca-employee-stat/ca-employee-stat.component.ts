import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-ca-employee-stat',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './ca-employee-stat.component.html',
  styleUrl: './ca-employee-stat.component.css'
})
export class CaEmployeeStatComponent implements OnInit {
  chartOptions: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeStats(1).then(data => {
      const dataPoints = data.hraEvaluations.map((item: any) => ({
        label: item.hraName,
        y: item.assignedApplicationsWithRevisionsCount
      }));

      this.chartOptions = {
        title: {
          text: 'Employee Performance'
        },
        animationEnabled: true,
        data: [{
          type: 'column',
          dataPoints: dataPoints
        }]
      };
    });
  }
}