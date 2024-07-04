import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { title } from 'process';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent {
  chartOptions = {
   
    axisX:{
      title: "Day of the Week"
    },
    axisY:{
      title: "Number of Applications"
    },
    data: [{
      type: "line",
      dataPoints: [
        { x: new Date(2021, 0, 1), y: 450 },
        { x: new Date(2021, 0, 2), y: 414 },
        { x: new Date(2021, 0, 3), y: 520 },
        { x: new Date(2021, 0, 4), y: 460 },
        { x: new Date(2021, 0, 5), y: 450 },
        { x: new Date(2021, 0, 6), y: 500 },
        { x: new Date(2021, 0, 7), y: 480 }
    
      ]
    }]                
    };
}
