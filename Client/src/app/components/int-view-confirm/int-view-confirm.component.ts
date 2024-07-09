import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { InterviewService } from '../../../services/interview.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface InterviewSchedule {
  name: string;
}
interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
}

interface IBookedSlot {
  seeker_id: number;
  start_time: Date;
  seeker_name: string;
}

interface INotBookedSlot {
  seeker_id: number;
  seeker_name: string;
}

interface IAllApplicants {
  booked_slot: IBookedSlot[];
  free_slot: INotBookedSlot[];
}

interface IDateTime{
  date:string;
  time:string;
}

@Component({
  selector: 'app-int-view-confirm',
  standalone: true,
  imports: [MatPaginatorModule,RouterModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTable, FormsModule, MatSnackBarModule, MatTableModule, MatDivider, MatCard, MatCardModule],
  templateUrl: './int-view-confirm.component.html',
  styleUrl: './int-view-confirm.component.css'
})
export class IntViewConfirmComponent {
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  isPopupVisible: boolean = false;
  advertismentId: number = 0;
  selectedDate: Date = new Date();
  schedules: INotBookedSlot[] = [];
  bookedSchedules: IBookedSlot[] = [];
  timeSlots: string[] = [
    '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am',
    '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm'
  ];
  dataSource = this.bookedSchedules;

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar, private interview: InterviewService) { 
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.advertismentId = Number(id); //
      if(id==null || this.advertismentId == 0){
        this.snackBar.open('Invalid Request', '', { panelClass: ['app-notification-error'] })._dismissAfter(7000);
      }else{
        this.advertismentId = Number(id);
      }
    });
  }

  ngOnInit() {
    // Fetch the interview schedules (this could be an API call in a real application)
    //let allApplicants:IAllApplicants = this.interview.getConfirmedSlot(1057);
    this.loadData(this.advertismentId);
    //this.schedules = result['free_slot'];
    console.log(this.dataSource);

  }

  async loadData(advertisement_id: number) {
    let result = await this.interview.getConfirmedSlot(advertisement_id);
    this.schedules = result['free_slot'];
    this.bookedSchedules = result['booked_slot'];

    //console.log(this.bookedSchedules);
  }


  onDateChange(date: Date) {
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    // Fetch new schedules based on selected date
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  openpopup() {
    this.isPopupVisible = true;
  }

  formatDate(date: string) {
    let dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    let dateTime:IDateTime = {date:dateStr,time:time};
    return dateTime;

  }
}
