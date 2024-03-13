import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


export interface PeriodicElement {
  id: number;
  name: string;
  es: string;
  status: string;
  review: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Lakmina Gamage', es:'Yes', status: 'Selected', review: 'Review Again'} ,
  {id: 2, name: 'Dimuth Asalanka', es:'No', status: '', review: 'Evaluate'},
  {id: 3, name: 'Dineth Wellalagamage', es:'Pending..', status: 'Passed', review: 'Review Again'} 
  
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

displayedColumns: string[] = ['id', 'name', 'es', 'status', 'review'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
