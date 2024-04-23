// import { Component } from '@angular/core';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { AfterViewInit, Inject, ViewChild } from '@angular/core';
// import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { AdvertisementServices } from '../../../services/advertisement.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatChipsModule } from '@angular/material/chips';
// import { Router } from '@angular/router';
// import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatTooltipModule } from '@angular/material/tooltip';


// interface hr {
//   application_Id : number;
//   first_name: string;
//   last_name: string;
//   field_name: string;
//   job_number: number;
//   title: string;
//   status: string;
//   evaluation_status: string;
// }

// var Table_data: JobOfferTable[] = [];


// @Component({
//   selector: 'app-signup2',
//   standalone: true,
//   imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatTableModule,MatTableModule,MatSortModule,MatPaginatorModule,MatIconModule,MatButtonModule,MatChipsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatTooltipModule,FormsModule,CommonModule],
//   templateUrl: './signup2.component.html',
//   styleUrl: './signup2.component.css'
// })
// export class Signup2Component {

//   //navbar
//   selected: number = 3;
//   colorList = ['black', 'back', 'black', 'black']

//   constructor() { }

//   ngOnInit(): void {
//     this.colorList.forEach(element => {
//       element = 'black';
//     });
    
//     this.colorList[this.selected] = 'primary';
//   }

//   //other

//   displayedColumns: string[] = ['ID', 'Name', 'Evaluation Status', ''];

//   @ViewChild(MatTable)
//   table!: MatTable<CompanyList>;

//   companyList: CompanyList[] = [];
//   companyListLength: number = 0;
//   selectedFilter: string = 'all';


// }
