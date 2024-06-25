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

  onStartTimeSet(event: any) {
    this.startTime = this.formatTimeTo24Hour(event);
  }

  // Event handler for end time set
  onEndTimeSet(event: any) {
    this.endTime = this.formatTimeTo24Hour(event);
  }

  events = [
    {
      title: '(Lab) Database Management Systems',
      time: '8:15 AM – 10:15 AM'
    },
    {
      title: 'Fundamentals of Business Economics',
      time: '10:30 AM – 12:30 PM'
    },
    {
      title: 'Statistical Inference',
      time: '3:30 PM – 5:30 PM'
    }
  ];

  records = [
    { id: 1, day: '20240625', start: 830, end: 1100 },
    { id: 2, day: '20240626', start: 1300, end: 1500 }
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
    return `${year}${month}${day}`;
  }

  addRecord(newRecord: { day: string, start: number, end: number }) {
    const newId = this.records.length > 0 ? Math.max(...this.records.map(record => record.id)) + 1 : 1;
    const recordWithId = { id: newId, ...newRecord };
    this.records.push(recordWithId);
  }

  print() {
    console.log({ day: this.formattedDate, start: this.startTime, end: this.endTime });
    if(this.startTime < this.endTime){
      this.addRecord({ day: this.formattedDate, start: this.startTime, end: this.endTime });
    }else{
      
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

}
