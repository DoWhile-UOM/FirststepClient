import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCalendarBody } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterviewService } from '../../../services/interview.service';

@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, NgxMaterialTimepickerModule, MatButtonModule, CommonModule, MatSidenavModule, MatCardModule, MatCalendarBody, MatNativeDateModule, MatCalendar],
  providers: [],
  templateUrl: './available-time-slot.component.html',
  styleUrls: ['./available-time-slot.component.css']
})
export class AvailableTimeSlotComponent {
  selectedDate: Date = new Date();
  calendarLoaded: boolean = false;
  startTime: number = 0;     // Variable to store start time
  endTime: number = 0;       // Variable to store end time
  isAddTimeDisabled: boolean = true;

  constructor(private snackBar: MatSnackBar, private interview: InterviewService) { }

  onStartTimeSet(event: any) {
    this.startTime = this.formatTimeTo24Hour(event);
  }

  // Event handler for end time set
  onEndTimeSet(event: any) {
    this.endTime = this.formatTimeTo24Hour(event);
    this.isAddTimeDisabled = false;
  }

  records = [
    { id: 1, day: '2024-06-25', start: 100, end: 200 },
    { id: 2, day: '2024-06-26', start: 2300, end: 2400 }
  ];

  ngOnInit() {
    // Delay loading of the calendar to avoid hydration issues
    setTimeout(() => {
      this.calendarLoaded = true;
    }, 100);
  }

  get formattedDate(): string {
    return this.selectedDate ? this.formatDate(this.selectedDate) : '';
  }

  getRecordsByDay(day: string) {
    return this.records.filter(record => record.day === day);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  addRecord(newRecord: { day: string, start: number, end: number }) {
    const newId = this.records.length > 0 ? Math.max(...this.records.map(record => record.id)) + 1 : 1;
    const recordWithId = { id: newId, ...newRecord };
    this.records.push(recordWithId);
    this.records = this.interview.arrangeByStartTime(this.records);
  }

  print() {
    let response: any = this.interview.checkForOverlaps(this.records, { id: 1, day: this.formattedDate, start: this.startTime, end: this.endTime });
    if (response.length > 0) {
      this.snackBar.open('The time slot overlaps with an existing time slot.', '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
      return;
    }

    if (this.startTime < this.endTime) {
      this.addRecord({ day: this.formattedDate, start: this.startTime, end: this.endTime });
      this.snackBar.open('The time slot has been successfully added.', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
    } else {
      this.snackBar.open('Please ensure that the Start Time precedes the End Time', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }

  }


  formatTimeTo24Hour(timeString: string): number {
    // Split the time string into hours, minutes, and period (AM/PM)
    const [time, period] = timeString.split(' ');

    // Split hours and minutes
    const [hours, minutes] = time.split(':').map(part => parseInt(part, 10));

    // Convert hours to 24-hour format
    let hours24 = hours;
    if (period === 'PM' && hours < 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }

    // Combine hours and minutes into a number (HHmm)
    const formattedTime = hours24 * 100 + minutes;

    return formattedTime;
  }

  formatTime(input: number): string {
    let timeString = input.toString();
    
    if (timeString.length < 3) {
      timeString = '0' + timeString;
    }
    
    const hours = parseInt(timeString.slice(0, -2), 10);
    const minutes = timeString.slice(-2);
    

    const period = hours < 12 ? 'AM' : 'PM';
    

    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes} ${period}`;
  }

  allocateTime() {
    this.interview.postSplittedTimeSlots(this.records, 30,7,1053);
  }


}
