import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

interface TimeSlot {
  date: string;
  day: string;
  time: string;
  duration: string;
}

@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './available-time-slot.component.html',
  styleUrls: ['./available-time-slot.component.css']
})
export class AvailableTimeSlotComponent implements OnInit {
  timeSlots: { [key: string]: TimeSlot[] } = {
    '2024-05-31': [
      { date: '2024-05-31', day: 'Friday', time: '6 AM - 9 AM', duration: '30 min' },
      { date: '2024-05-31', day: 'Friday', time: '6 AM - 9 AM', duration: '30 min' },
      { date: '2024-05-31', day: 'Friday', time: '6 AM - 9 AM', duration: '30 min' },
      { date: '2024-05-31', day: 'Friday', time: '6 AM - 9 AM', duration: '30 min' }

    ],
    '2024-06-01': [
      { date: '2024-06-01', day: 'Saturday', time: '9 AM - 10 AM', duration: '60 min' },
      { date: '2024-06-01', day: 'Saturday', time: '10 AM - 11 AM', duration: '30 min' }
    ],
    '2024-06-02': [
      { date: '2024-06-02', day: 'Sunday', time: '10 AM - 11 AM', duration: '30 min' },
      { date: '2024-06-02', day: 'Sunday', time: '11 AM - 12 PM', duration: '30 min' }
    ],
    '2024-06-03': [
      { date: '2024-06-03', day: 'Monday', time: '11 AM - 12 PM', duration: '30 min' }
    ],
    '2024-06-04': [
      { date: '2024-06-04', day: 'Tuesday', time: '1 PM - 2 PM', duration: '60 min' }
    ],
    '2024-06-05': [
      { date: '2024-06-05', day: 'Wednesday', time: '2 PM - 3 PM', duration: '30 min' }
    ],
    '2024-06-06': [
      { date: '2024-06-06', day: 'Thursday', time: '3 PM - 4 PM', duration: '30 min' }
    ],
    '2024-06-07': [
      { date: '2024-06-07', day: 'Friday', time: '4 PM - 5 PM', duration: '30 min' }
    ],
    '2024-06-08': [
      { date: '2024-06-08', day: 'Saturday', time: '5 PM - 6 PM', duration: '60 min' }
    ],
    '2024-06-09': [
      { date: '2024-06-09', day: 'Sunday', time: '6 PM - 7 PM', duration: '30 min' }
    ]
  };

  constructor(private snackBar: MatSnackBar, public datePipe: DatePipe) {}

  ngOnInit(): void {}

  addTimeSlot(date: string, day: string, time: string, duration: string) {
    if (!this.timeSlots[date]) {
      this.timeSlots[date] = [];
    }
    this.timeSlots[date].push({ date, day, time, duration });
    this.snackBar.open('Time slot added', 'Close', { duration: 3000 });
  }

  editTimeSlot(date: string, index: number, time: string, duration: string) {
    this.timeSlots[date][index] = { ...this.timeSlots[date][index], time, duration };
    this.snackBar.open('Time slot edited', 'Close', { duration: 3000 });
  }

  deleteTimeSlot(date: string, index: number) {
    this.timeSlots[date].splice(index, 1);
    if (this.timeSlots[date].length === 0) {
      delete this.timeSlots[date];
    }
    this.snackBar.open('Time slot deleted', 'Close', { duration: 3000 });
  }

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }
}
