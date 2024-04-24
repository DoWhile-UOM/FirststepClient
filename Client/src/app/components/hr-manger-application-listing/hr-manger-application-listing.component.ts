import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Inject, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


export interface PeriodicElement {
  id: number;
  name: string;
  dropdownOptions: string[];  
  status: string;
  review: string;
  icon: string;
  


}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Lakmina Gamage', dropdownOptions: ['Yes', 'No','Pending..'], status: 'Selected', review: 'Review Again', icon: 'check'} ,
  {id: 2, name: 'Dimuth Asalanka', dropdownOptions: ['Yes', 'No','Pending..'], status: '', review: 'Evaluate', icon: 'check'},
  {id: 3, name: 'Dineth Wellalagamage', dropdownOptions: ['Yes', 'No','Pending..'], status: 'Passed', review: 'Review Again', icon: 'check'}, 
  
];




@Component({
  selector: 'app-hr-manger-application-listing',
  standalone: true,
  imports: [MatSlideToggleModule, MatToolbarModule, MatSortModule, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatChipsModule, FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTooltipModule,MatToolbar,MatIcon,MatLabel,MatSelectModule],
  templateUrl: './hr-manger-application-listing.component.html',
  styleUrl: './hr-manger-application-listing.component.css'
})
export class HrMangerApplicationListingComponent {
  //navbar
  selected: number = 3;
  colorList = ['black', 'back', 'black', 'black']

  constructor() { }

  ngOnInit(): void {
    this.colorList.forEach(element => {
      element = 'black';
    });
    
    this.colorList[this.selected] = 'primary';
  }

   //table

displayedColumns: string[] = ['id', 'name', 'actions', 'status', 'review','action'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
