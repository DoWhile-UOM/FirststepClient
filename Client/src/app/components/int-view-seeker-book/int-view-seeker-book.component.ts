import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { InterviewService } from '../../../services/interview.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';
interface advertisementDetials {
  interview_duration: number;
  title: string;
  company_name: string;
}

@Component({
  selector: 'app-int-view-seeker-book',
  standalone: true,
  imports: [SpinnerComponent, MatGridListModule, MatDividerModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './int-view-seeker-book.component.html',
  styleUrl: './int-view-seeker-book.component.css'
})
export class IntViewSeekerBookComponent {
  advertismentDetails: advertisementDetials = { interview_duration: 0, title: '', company_name: '' };
  advertismentId: number = 0;
  seekerid: number = 0;

  constructor(private router: Router,public dialog: MatDialog, private spinner: NgxSpinnerService, private auth: AuthService, private snackBar: MatSnackBar, private route: ActivatedRoute, private interview: InterviewService) {
    this.spinner.show();
    this.seekerid = Number(this.auth.getUserId());
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      const uid = params.get('uid');
      this.advertismentId = Number(id); //
      if (id == null || this.advertismentId == 0) {
        this.snackBar.open('Invalid Request', '', { panelClass: ['app-notification-error'] })._dismissAfter(7000);
      } else {
        this.advertismentId = Number(id);
        this.seekerid = Number(uid);
      }
    });
    this.loadSlot();
    //this.spinner.hide();

  }
  schedule2: any;

  ngOnInit() {
    console.log(this.schedule2);
  }

  isPopupVisible: boolean = false;
  currentslot = { day: '', date: 0, time: '', id: 0 };

  showPopup(day: string, date: number, time: string, aid: number) {
    this.isPopupVisible = true;
    this.currentslot = { day: day, date: date, time: time, id: aid };
    console.log('Date ' + date + ' Time ' + time);
  }

  confirmTime(appointment_id: number) {
    this.spinner.show();
    this.interview.bookSlotSeeker(appointment_id, this.seekerid);//change 4159 to the actual seeker id
    console.log('Appointment ID ' + appointment_id);
    this.closePopup();
    this.openFinaldialog();
    this.spinner.hide();
    const delay = 6000;
    setTimeout(() => {
      this.dialog.closeAll();
      this.router.navigate(['/login']); // Replace '/target-route' with your desired route
    }, delay);
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  async loadSlot() {
    let result = await this.interview.getAvailableSlots2(this.advertismentId);
    const slots = result['slot'];
    this.advertismentDetails = result['details'];
    this.schedule2 = this.getFormattedSchedule(slots);
    this.spinner.hide();
    //console.log(this.schedule2);
  }

  getFormattedSchedule(schedule: { appointment_id: number; start_time: string }[]) {
    let slotData: { id: number, start: string } = { id: 0, start: '' };
    const weekDays: { number: string; timeSlots: typeof slotData[] }[] = [];
    const groupedSchedule: { [date: string]: { appointment_id: number; start_time: string }[] } = {};

    schedule.forEach(slot => {
      const date = new Date(slot.start_time).toISOString().split('T')[0];
      if (!groupedSchedule[date]) {
        groupedSchedule[date] = [];
      }
      groupedSchedule[date].push(slot);
    });

    for (const date in groupedSchedule) {
      let timeSlots = groupedSchedule[date].map(slot => {
        const time = new Date(slot.start_time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        slotData = { id: slot.appointment_id, start: time };
        return slotData;
      });
      const formattedDate = date;
      weekDays.push({ number: formattedDate, timeSlots });
    }

    return weekDays;
  }

  openFinaldialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '1000px',
      disableClose: true, 
      data: { header:'Appointment Successfully Booked',input: 'Your appointment has been successfully booked. Please check your mailbox for full details. You will now be redirected to the home page.' }
    });

    dialogRef.afterClosed().subscribe(result => {
    }

    );
  }


}
