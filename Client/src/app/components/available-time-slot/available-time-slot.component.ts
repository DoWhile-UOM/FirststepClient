import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCalendarBody } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [MatButtonModule,CommonModule, MatSidenavModule, MatCardModule, MatCalendarBody, MatNativeDateModule, MatCalendar],
  providers: [],
  templateUrl: './available-time-slot.component.html',
  styleUrls: ['./available-time-slot.component.css']
})
export class AvailableTimeSlotComponent {
  selectedDate: Date = new Date();
  calendarLoaded: boolean = false;
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

  ngOnInit() {
    // Delay loading of the calendar to avoid hydration issues
    setTimeout(() => {
      this.calendarLoaded = true;
    }, 100);
  }
}
