import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {IconOptions, MatIconModule} from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatListModule } from '@angular/material/list';
import { CaNavBarComponent } from "../ca-nav-bar/ca-nav-bar.component";

export interface PeriodicElement {
  title: string;
  id: number;
  field: string;
  date: string;
  noOfApplications: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, title: 'Software Engineer', field:'IT & CS', date: '20-12-2023', noOfApplications: 25},
  {id: 2, title: 'Backend Developer', field:'IT & CS' , date: '11-05-2023', noOfApplications: 20},
  {id: 3, title: 'ASP.NET Developer', field:'IT & CS' , date: '03-06-2023', noOfApplications: 22},
  {id: 4, title: 'React Developer', field:'IT & CS' , date: '30-11-2023', noOfApplications: 24},
  {id: 5, title: 'Senior Business Analyst', field:'Business' , date: '03-12-2023', noOfApplications: 19},
  {id: 6, title: 'Frontend Developer', field:'IT & CS' , date: '11-05-2023', noOfApplications: 21},
  {id: 7, title: 'Angular Developer', field:'IT & CS' , date: '03-06-2023', noOfApplications: 15},

  
];

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [MatSidenavModule, MatIconModule, MatInputModule, MatSelectModule, MatMenuModule, MatGridListModule, MatTableModule, MatFormFieldModule, CommonModule, CanvasJSAngularChartsModule, MatListModule, CaNavBarComponent]
})
export class AdminDashboardComponent {
  
  
link: any;
showInfo(arg0: any) {
throw new Error('Method not implemented.');
}
https: any;


//table

displayedColumns: string[] = ['id', 'title', 'field', 'date', 'noOfApplications'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

//chart
chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Application Status",
      fontFamily: "Roboto",
	  fontweight: "300px",
    },
    axisX:{
      title: "Job Title",
      reversed: true
    },
    axisY:{
      title: "Applications",
      prefix: "",
      suffix: "",
      includeZero: true
    },
    toolTip:  {
      shared: true
    },
    data: [{
      type: "stackedBar",
      name: "Not Reviewed",
      showInLegend: "true",
      yValueFormatString: "#,###",
      color: "#785EF0",
      dataPoints: [
        {  y: 9, label: "Software Engineer"},
        {  y: 7, label: "Backend Developer" },
        {  y: 13, label: "ASP.NET Developer" },
        {  y: 13, label: "React Developer" },
		{  y: 11, label: "Senior Business Analyst" },
		{  y: 9, label: "Frontend Developer" },
		{  y: 6, label: "Angular Developer" }
      ]
    }, {
      type: "stackedBar",
      name: "Selected",
      showInLegend: "true",
      yValueFormatString: "#,###",
      color: "#A7D42C",
      dataPoints: [
		{  y: 7, label: "Software Engineer"},
        {  y: 5, label: "Backend Developer" },
        {  y: 4, label: "ASP.NET Developer" },
        {  y: 3, label: "React Developer" },
		{  y: 2, label: "Senior Business Analyst" },
		{  y: 4, label: "Frontend Developer" },
		{  y: 3, label: "Angular Developer" }
      ]
    }, {
      type: "stackedBar",
      name: "Passed",
      showInLegend: "true",
      yValueFormatString: "#,###",
      color: "#f4d9be",
      dataPoints: [
        {  y:2, label: "Software Engineer"},
        {  y: 0, label: "Backend Developer" },
        {  y: 0, label: "ASP.NET Developer" },
        {  y: 3, label: "React Developer" },
		{  y: 0, label: "Senior Business Analyst" },
		{  y: 1, label: "Frontend Developer" },
		{  y: 4, label: "Angular Developer" }
      ]
    }, {
      type: "stackedBar",
      name: "Rejected",
      showInLegend: "true",
      yValueFormatString: "#,###",
      color: "#DC267F",
      dataPoints: [
        {  y: 7, label: "Software Engineer"},
        {  y: 8, label: "Backend Developer" },
        {  y: 5, label: "ASP.NET Developer" },
        {  y: 5, label: "React Developer" },
		{  y: 6, label: "Senior Business Analyst" },
		{  y: 7, label: "Frontend Developer" },
		{  y: 2, label: "Angular Developer" }
      ]
    }]
  }		





}
