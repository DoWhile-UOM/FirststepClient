import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { title } from 'process';

interface ApplicationData {
  date: string;
  count: number;
}

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent implements OnChanges{

  @Input() applicationData: ApplicationData[] = [];
  chartOptions = {
     
      axisX:{
        title: "Day of the Week"
      },
      axisY:{
        title: "Number of Applications"
      },
      data: [{
        type: "line",
        dataPoints: [] as { x: Date; y: number; }[],
         
      }]                
  };

    ngOnChanges(changes:SimpleChanges):void {
      if(changes['applicationData']){
        try{
        this.updateChart(); 
        }
        catch(e){
          console.log('no applications',e);
        }
      }
    }

    updateChart(): void {
      const dataPoints = this.applicationData.map((data) => {
        return {
          x: new Date(data.date),
          y: data.count
        };
      });
   
      this.chartOptions = {
        ...this.chartOptions,
        data: [{
          type: "line",
          dataPoints: dataPoints,
        }]
    }
}
}
