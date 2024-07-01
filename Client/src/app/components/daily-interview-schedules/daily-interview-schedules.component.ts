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
  selectedDate: Date = new Date();  // Initialize the selected date to today's date
  schedules: AppointmentSchedule[] = [];  // Array to hold schedules for the selected date
  timeSlots: { label: string, start: Date, end: Date }[] = [];  // Array to hold time slots
  todaysSchedules: AppointmentSchedule[] = [];  // Array to hold today's schedules

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService) {}

  ngOnInit() {
    console.log("ngOnInit called");
    this.generateTimeSlots();  // Generate time slots for the schedule
    this.fetchSchedules(this.selectedDate);  // Fetch schedules for the selected date
  }

  // Method to generate time slots from 7am to 11pm, with 30-minute intervals
  generateTimeSlots() {
    const startHour = 7;  // Starting hour
    const endHour = 23;  // Ending hour
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        const timeLabel = `${hour}:${minute.toString().padStart(2, '0')}${hour < 12 ? 'am' : 'pm'}`;
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 30);
        this.timeSlots.push({ label: timeLabel, start: startTime, end: endTime });
      }
    }
  }

  // Method to get the schedules for a specific time slot
  getScheduleForTimeSlot(timeSlot: { label: string, start: Date, end: Date }): AppointmentSchedule[] {
    return this.schedules.filter(schedule => {
      const scheduleStartTime = new Date(schedule.start_time);
      const scheduleEndTime = new Date(schedule.end_time);
      return scheduleStartTime >= timeSlot.start && scheduleEndTime <= timeSlot.end;
    });
  }

  // Method to handle date change from the calendar
  onDateChange(date: Date) {
    console.log(`Date changed to: ${date.toDateString()}`);
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    this.fetchSchedules(date);  // Fetch schedules for the newly selected date
  }

  // Method to fetch schedules for the selected date
  fetchSchedules(date: Date) {
    console.log(`Fetching schedules for selected date: ${date.toDateString()}`); // Debugging line
    this.appointmentService.getSchedulesByDate(date).then(
      (schedules: AppointmentSchedule[]) => {
        this.schedules = schedules;
        console.log('Fetched Schedules:', this.schedules); // Debugging line
      },
      (error) => {
        const errorMsg = error.toString().slice(0, 200); // Truncate error message
        console.error('Error fetching schedules:', errorMsg);
        this.snackBar.open('Failed to fetch schedules', '', { duration: 3000 });
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