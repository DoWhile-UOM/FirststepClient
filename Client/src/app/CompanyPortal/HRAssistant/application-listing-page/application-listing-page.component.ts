import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


export interface PeriodicElement {
  id: number;
  title: string;
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
  selector: 'app-application-listing-page',
  standalone: true,
  imports: [MatToolbar,MatIcon,MatLabel,MatInputModule,MatTableModule,MatFormFieldModule],
  templateUrl: './application-listing-page.component.html',
  styleUrl: './application-listing-page.component.css'
})


export class ApplicationListingPageComponent {

    //table

displayedColumns: string[] = ['id', 'title', 'field', 'date', 'noOfApplications'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
