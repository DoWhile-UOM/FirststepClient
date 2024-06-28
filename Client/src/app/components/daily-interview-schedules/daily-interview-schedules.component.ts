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
import { AppointmentService } from '../../../services/appointment.service';

interface AppointmentSchedule {
  appointment_id: number;
  first_name: string;
  last_name: string;
  title: string;
  status: string;
  start_time: string;
  end_time: string;
}

@Component({
  selector: 'app-daily-interview-schedules',
  standalone: true,
  imports: [MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTable, FormsModule, MatSnackBarModule, MatTableModule, MatDivider, MatCard, MatCardModule],
  templateUrl: './daily-interview-schedules.component.html',
  styleUrl: './daily-interview-schedules.component.css'
})

export class DailyInterviewSchedulesComponent implements OnInit {
  selectedDate: Date = new Date();  
  schedules: AppointmentSchedule[] = [];
  timeSlots: string[] = [
    '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am',
    '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm',
    '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm',
    '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm',
    '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm', '9:30pm',
    '10:00pm', '10:30pm', '11:00pm', '11:30pm', '12:00am'
];


  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchSchedules(this.selectedDate);
  }

  getScheduleForTimeSlot(timeSlot: string): AppointmentSchedule[] {
    return this.schedules.filter(schedule => {
      const scheduleTime = new Date(schedule.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
      return scheduleTime === timeSlot;
    });
  }
  

  onDateChange(date: Date) {
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    this.fetchSchedules(date);
  }

  fetchSchedules(date: Date) {
    this.appointmentService.getSchedulesByDate(date).then(
      (schedules: AppointmentSchedule[]) => {
        this.schedules = schedules;
        console.log("Fetched Schedules: ", schedules);
      },
      (error) => {
        this.snackBar.open('Failed to fetch schedules', '', { duration: 3000 });
      }
    );
  }

  updateStatus(appointmentId: number, status: string) {
    this.appointmentService.updateAppointmentStatus(appointmentId, status).then(
      () => {
        this.snackBar.open('Status updated successfully', '', { duration: 3000 });
        this.fetchSchedules(this.selectedDate); // Refresh the schedules
      },
      (error) => {
        this.snackBar.open('Failed to update status', '', { duration: 3000 });
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Booked':
        return 'booked';
      case 'Missed':
        return 'missed';
      case 'Complete':
        return 'complete';
      default:
        return '';
    }
  }
}