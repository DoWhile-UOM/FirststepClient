import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';


interface InterviewSchedule {
  name: string;
}
interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { name: 'Helium', weight: 4.0026, symbol: 'He' },
  { name: 'Lithium', weight: 6.941, symbol: 'Li' },

];

@Component({
  selector: 'app-int-view-confirm',
  standalone: true,
  imports: [MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTable, FormsModule, MatSnackBarModule, MatTableModule, MatDivider, MatCard, MatCardModule],
  templateUrl: './int-view-confirm.component.html',
  styleUrl: './int-view-confirm.component.css'
})
export class IntViewConfirmComponent {
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  isPopupVisible:boolean = false;
  selectedDate: Date = new Date();
  schedules: InterviewSchedule[] = [];
  timeSlots: string[] = [
    '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am',
    '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm'
  ];
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Fetch the interview schedules (this could be an API call in a real application)
    this.schedules = [
      { name: 'James Williams' },
      { name: 'Willem van Helden' },
      { name: 'Dianne Russel' },
      { name: 'Theresa Webb' }
    ];
  }


  onDateChange(date: Date) {
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    // Fetch new schedules based on selected date
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  openpopup(){
    this.isPopupVisible = true;
  }
}
