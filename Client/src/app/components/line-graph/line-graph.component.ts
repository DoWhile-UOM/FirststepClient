import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent {
  chartOptions = {
    title: {
      text: "Applications Submitted During the Week"
    },
    data: [{
      type: "column",
      dataPoints: [
      { label: "Apple",  y: 10  },
      { label: "Orange", y: 15  },
      { label: "Banana", y: 25  },
      { label: "Mango",  y: 30  },
      { label: "Grape",  y: 28  }
      ]
    }]                
    };
}
