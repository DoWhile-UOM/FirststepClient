import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCalendarBody } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterviewService } from '../../../services/interview.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

interface IRecord {
  id: number;
  day: string;
  start: number;
  end: number;
}
interface IAppointmentDetails {
  duration: number;
  comment: string;
  title: string;
}
@Component({
  selector: 'app-available-time-slot',
  standalone: true,
  imports: [SpinnerComponent, MatDividerModule, ReactiveFormsModule, MatIcon, MatFormFieldModule, MatInputModule, NgxMaterialTimepickerModule, MatButtonModule, CommonModule, MatSidenavModule, MatCardModule, MatCalendarBody, MatNativeDateModule, MatCalendar],
  providers: [],
  templateUrl: './available-time-slot.component.html',
  styleUrls: ['./available-time-slot.component.css']
})
export class AvailableTimeSlotComponent {
  interViewDuration: number = 0;
  isFormFilled: boolean = false;
  isIntroPopupVisible: boolean = true;
  isPopupVisible: boolean = false;

  advertismentId: number = 0;
  job_number: number = 0;
  advertisment_title: string = '';

  selectedDate: Date = new Date();
  calendarLoaded: boolean = false;
  startTime: number = 0;
  endTime: number = 0;
  isAddTimeDisabled: boolean = true;
  userType: string = 'ca';
  appointmentDetails: FormGroup;
  records: IRecord[] = [];
  appointment: IAppointmentDetails = { duration: 30, comment: '', title: '' };

  constructor(
    public dialog: MatDialog,
    private spinner:
      NgxSpinnerService,
    private formAPD: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private interview: InterviewService,
    private auth: AuthService,
    private advertisementService: AdvertisementServices) {
    this.spinner.show();
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.advertismentId = Number(id);
      if (id == null || this.advertismentId == 0 || this.auth.getCompanyID() == null) {
        this.snackBar.open('Invalid Request', '', { panelClass: ['app-notification-error'] })._dismissAfter(7000);
      } else {
        this.advertismentId = Number(id);
        this.spinner.hide();
      }
    });
    this.appointmentDetails = this.formAPD.group({
      title: [''],
      duration: ['', Validators.required],
      comments: ['']
    });
  }

  onChanges(): void {

    this.appointmentDetails.get('duration')?.valueChanges.subscribe(val => {
      this.appointment.duration = val;
      if (this.appointment.duration > 0) {
        this.isFormFilled = true;
      } else {
        this.isFormFilled = false;
      }
      console.log(this.interViewDuration);
    });
    this.appointmentDetails.get('title')?.valueChanges.subscribe(val => {
      this.appointment.title = val;
    });
    this.appointmentDetails.get('comments')?.valueChanges.subscribe(val => {
      this.appointment.comment = val;
    });
  }

  onStartTimeSet(event: any) {
    this.startTime = this.formatTimeTo24Hour(event);
  }

  // Event handler for end time set
  onEndTimeSet(event: any) {
    this.endTime = this.formatTimeTo24Hour(event);
    this.isAddTimeDisabled = false;
  }

  ngOnInit() {
    //this.userType = this.auth.getRole();-----hardcoded for testing--------------------

    setTimeout(() => {
      this.calendarLoaded = true;
    }, 100);
    this.onChanges();

    const jobData = this.advertisementService.getJobData();

    if (jobData) {
      this.job_number = jobData.jobNumber;
      this.advertisment_title = jobData.jobTitle;
    }
    else {
      //this.router.navigate(['/notfound']);
    }
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
    this.closePopup();
    this.openFinaldialog();
    this.spinner.show();
    this.interview.postSplittedTimeSlots(this.records, this.appointment.duration,this.advertismentId,this.auth.getCompanyID());
    this.spinner.hide();
    const delay = 6000;
    setTimeout(() => {
      this.dialog.closeAll();
      const url = 'ca/jobOfferList/applicationList';
      const params = { jobID: this.advertismentId };
      this.router.navigate([url], { queryParams: params }); // Replace '/target-route' with your desired route
    }, delay);
  }

  closeAppointmentPopup() {
    this.isIntroPopupVisible = false;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  openPopup() {
    this.isIntroPopupVisible = true;
  }

  openAllocateopup() {
    this.isPopupVisible = true;
  }

  dummy() {

  }

  onBackButtonClick() {
    window.history.back();
  }

  openFinaldialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '1000px',
      disableClose: true,
      data: { header: 'Time Allocation Successful', input: 'The time allocation process has been successfully completed, and emails have been sent to seekers to book their time slots. You will now be redirected to the job offer page.' }
    });

    dialogRef.afterClosed().subscribe(result => {
    }

    );
  }
}
