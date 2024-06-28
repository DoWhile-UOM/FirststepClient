import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { InterviewService } from '../../../services/interview.service';

@Component({
  selector: 'app-int-view-seeker-book',
  standalone: true,
  imports: [MatGridListModule, MatDividerModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './int-view-seeker-book.component.html',
  styleUrl: './int-view-seeker-book.component.css'
})
export class IntViewSeekerBookComponent {

  constructor(private interview: InterviewService) {
    this.loadSlot();
  }
  schedule2: any;

  ngOnInit() {
    console.log(this.schedule2);
  }

  weekDays = [
    { name: 'WED', number: 11, timeSlots: ['10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm'] },
    { name: 'THU', number: 12, timeSlots: [] },
    { name: 'FRI', number: 13, timeSlots: [] },
    { name: 'SAT', number: 14, timeSlots: [] },
    { name: 'SUN', number: 15, timeSlots: [] },
    { name: 'MON', number: 16, timeSlots: ['10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm'] },
  ];

  schedule = [{ "appointment_id": 6, "start_time": "2024-06-25T01:00:00" }, { "appointment_id": 7, "start_time": "2024-06-25T01:30:00" }, { "appointment_id": 8, "start_time": "2024-06-26T23:00:00" }, { "appointment_id": 9, "start_time": "2024-06-26T23:30:00" }];

  isPopupVisible: boolean = false;
  currentslot = { day: '', date: 0, time: '' };

  showPopup(day: string, date: number, time: string) {
    this.isPopupVisible = true;
    this.currentslot = { day: day, date: date, time: time };
    console.log('Date ' + date + ' Time ' + time);
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  async loadSlot() {
    try {
      const result = await this.interview.getAvailableSlots(1053);
      console.log(result);
      this.schedule2 = this.getFormattedSchedule(result);

    } catch (err) {
      console.log(err);
    }
  }

  getFormattedSchedule(schedule: { appointment_id: number; start_time: string }[]) {
    const weekDays: { number: string; timeSlots: string[] }[] = [];
    const groupedSchedule: { [date: string]: { appointment_id: number; start_time: string }[] } = {};

    // Group schedule by date
    schedule.forEach(slot => {
      const date = new Date(slot.start_time).toISOString().split('T')[0];
      if (!groupedSchedule[date]) {
        groupedSchedule[date] = [];
      }
      groupedSchedule[date].push(slot);
    });

    // Format the grouped schedule into the desired format
    for (const date in groupedSchedule) {
      const timeSlots = groupedSchedule[date].map(slot => {
        const time = new Date(slot.start_time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        return time;
      });
      const formattedDate = date;
      weekDays.push({ number: formattedDate, timeSlots });
    }

    return weekDays;
  }



}
