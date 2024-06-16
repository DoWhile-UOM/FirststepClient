import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

interface TimeSlot {
  date: string;
  day: string;
  time: string;
}
@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [MatTable, MatTableModule, MatButtonModule, MatSnackBarModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './available-time-slot.component.html',
  styleUrl: './available-time-slot.component.css'
})
export class AvailableTimeSlotComponent  implements OnInit {
  timeSlots: TimeSlot[] = [
    { date: '2024-05-31', day: 'Monday', time: '6 AM - 9 PM' },
    { date: '2024-06-02', day: 'Tuesday', time: '6 AM - 8 AM' },
    { date: '2024-06-02', day: 'Tuesday', time: '11 AM - 12 PM' }
  ];
  dataSource = new MatTableDataSource<TimeSlot>(this.timeSlots);
  displayedColumns: string[] = ['no', 'date', 'day', 'time', 'actions'];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addTimeSlot(date: string, day: string, time: string) {
    this.timeSlots.push({ date, day, time });
    this.dataSource.data = this.timeSlots;
    this.snackBar.open('Time slot added', 'Close', { duration: 3000 });
  }

  editTimeSlot(index: number, date: string, day: string, time: string) {
    this.timeSlots[index] = { date, day, time };
    this.dataSource.data = this.timeSlots;
    this.snackBar.open('Time slot edited', 'Close', { duration: 3000 });
  }

  deleteTimeSlot(index: number) {
    this.timeSlots.splice(index, 1);
    this.dataSource.data = this.timeSlots;
    this.snackBar.open('Time slot deleted', 'Close', { duration: 3000 });
  }
}