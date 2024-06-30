import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { InterviewService } from '../../../services/interview.service';

interface advertisementDetials {
  interview_duration: number;
  title: string;
  company_name: string;
}

@Component({
  selector: 'app-int-view-seeker-book',
  standalone: true,
  imports: [MatGridListModule, MatDividerModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './int-view-seeker-book.component.html',
  styleUrl: './int-view-seeker-book.component.css'
})
export class IntViewSeekerBookComponent {
  advertismentDetails: advertisementDetials = { interview_duration: 0, title: '', company_name: '' };

  constructor(private interview: InterviewService) {
    this.loadSlot();
  }
  schedule2: any;

  ngOnInit() {
    console.log(this.schedule2);
  }

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
    let result = await this.interview.getAvailableSlots2(22);
    const slots = result['slot'];
    this.advertismentDetails = result['details'];
    this.schedule2 = this.getFormattedSchedule(slots);
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
