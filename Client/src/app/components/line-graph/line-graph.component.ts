import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {CommonModule} from '@angular/common';

interface ApplicationData {
  date: string;
  count: number;
}

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent implements OnChanges{

  @Input() applicationData: ApplicationData[] = [];
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chartOptions: any = {
    axisX: {
      title: "Day of the Week"
    },
    axisY: {
      title: "Number of Applications"
    },
    data: [{
      type: "line",
      dataPoints: [] as { x: Date; y: number; }[],
    }]
  };

  hasData = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicationData']) {
      try {
        this.updateChart();
      } catch (e) {
        console.log('no applications', e);
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
    };

    this.hasData = dataPoints.length > 0;

    if (this.chartContainer) {
      const chart = this.chartContainer.nativeElement;
      chart.options = this.chartOptions;
      chart.render();
    }
  }
}