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

interface InterviewSchedule {
  no: number;
  name: string;
  jobTitle: string;
  status: string;
  time: string;
}

@Component({
  selector: 'app-daily-interview-schedules',
  standalone: true,
  imports: [MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTable, FormsModule, MatSnackBarModule, MatTableModule, MatDivider],
  templateUrl: './daily-interview-schedules.component.html',
  styleUrl: './daily-interview-schedules.component.css'
})
export class DailyInterviewSchedulesComponent {
  displayedColumns: string[] = ['no', 'name', 'jobTitle', 'status', 'time', 'details'];
  dataSource = new MatTableDataSource<InterviewSchedule>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Fetch the interview schedules (this could be an API call in a real application)
    const schedules: InterviewSchedule[] = [
      { no: 1, name: 'Dimuth Asalanka', jobTitle: 'ASP.NET Developer', status: 'Missed', time: '10.00 AM' },
      { no: 2, name: 'Ashan Matheesha', jobTitle: 'Senior Business Analyst', status: 'Missed', time: '11.00 AM' },
      { no: 3, name: 'Sanka Bimasara', jobTitle: 'IOS Developer', status: 'Confirmed', time: '1.00 PM' }
    ];
    this.dataSource.data = schedules;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showDetails(element: InterviewSchedule) {
    this.snackBar.open(`Details for ${element.name}`, '', { duration: 3000 });
  }
}