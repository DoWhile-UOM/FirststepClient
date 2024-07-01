import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-int-view-seeker-book',
  standalone: true,
  imports: [MatGridListModule,MatDividerModule,CommonModule,MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './int-view-seeker-book.component.html',
  styleUrl: './int-view-seeker-book.component.css'
})
export class IntViewSeekerBookComponent {
  weekDays = [
    { name: 'WED', number: 11, timeSlots: ['10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm'] },
    { name: 'THU', number: 12, timeSlots: [] },
    { name: 'FRI', number: 13, timeSlots: [] },
    { name: 'SAT', number: 14, timeSlots: [] },
    { name: 'SUN', number: 15, timeSlots: [] },
    { name: 'MON', number: 16, timeSlots: ['10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm'] },
  ];

  isPopupVisible: boolean = false;
  currentslot={day:'',date:0,time:''};

  showPopup(day:string,date:number,time:string) {
    this.isPopupVisible = true;
    this.currentslot={day:day,date:date,time:time};
    console.log('Date '+date+' Time '+time);
  }

  closePopup() {
    this.isPopupVisible = false;
  }



}
