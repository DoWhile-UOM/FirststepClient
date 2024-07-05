import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-doughnut-graph-status',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './doughnut-graph-status.component.html',
  styleUrl: './doughnut-graph-status.component.css',
})
export class DoughnutGraphStatusComponent {

  chartOptions = {
    title:{
      text: "Applications Status"
    },
    data: [{
      type: "doughnut",
      showInLegend: true,
      innerRadius: "40%",
      legendText: "{label}",
      dataPoints: [
        { label: "Submitted", y: 450,color: "#3E95CD"},
        { label: "In Review", y: 414,color: "#8E5EA2"},
        { label: "Accepted", y: 520,color: "#3cba9f"},
       
      ]
    }]
  }
}
