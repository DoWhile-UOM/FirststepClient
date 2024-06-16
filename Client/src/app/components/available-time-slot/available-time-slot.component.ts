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
import { CommonModule } from '@angular/common';

interface TimeSlot {
  date: string;
  day: string;
  time: string;
  duration: string;
}
@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [MatTable, MatTableModule, MatButtonModule, MatSnackBarModule, MatInputModule, MatFormFieldModule, MatIconModule, CommonModule],
  templateUrl: './available-time-slot.component.html',
  styleUrl: './available-time-slot.component.css'
})
export class AvailableTimeSlotComponent  implements OnInit {
  timeSlots: TimeSlot[] = [
    { date: '2024-05-31', day: 'Monday', time: '6 AM - 9 AM', duration: '45 min' },
    { date: '2024-06-01', day: 'Tuesday', time: '9 AM - 10 AM', duration: '60 min' },
    { date: '2024-06-02', day: 'Wednesday', time: '10 AM - 11 AM', duration: '45 min' },
    { date: '2024-06-03', day: 'Thursday', time: '11 AM - 12 PM', duration: '30 min' },
    { date: '2024-06-04', day: 'Friday', time: '1 PM - 2 PM', duration: '60 min' },
    { date: '2024-06-05', day: 'Saturday', time: '2 PM - 3 PM', duration: '45 min' },
    { date: '2024-06-06', day: 'Sunday', time: '3 PM - 4 PM', duration: '45 min' },
    { date: '2024-06-07', day: 'Monday', time: '4 PM - 5 PM', duration: '30 min' },
    { date: '2024-06-08', day: 'Tuesday', time: '5 PM - 6 PM', duration: '60 min' },
    { date: '2024-06-09', day: 'Wednesday', time: '6 PM - 7 PM', duration: '45 min' }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addTimeSlot(date: string, day: string, time: string, duration: string) {
    this.timeSlots.push({ date, day, time, duration });
    this.snackBar.open('Time slot added', 'Close', { duration: 3000 });
  }

  editTimeSlot(index: number, date: string, day: string, time: string, duration: string) {
    this.timeSlots[index] = { date, day, time, duration };
    this.snackBar.open('Time slot edited', 'Close', { duration: 3000 });
  }

  deleteTimeSlot(index: number) {
    this.timeSlots.splice(index, 1);
    this.snackBar.open('Time slot deleted', 'Close', { duration: 3000 });
  }
}