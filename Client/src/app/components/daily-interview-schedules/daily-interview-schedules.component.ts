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
  timeSlots: { label: string, start: Date, end: Date }[] = [];

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.generateTimeSlots();
    this.fetchSchedules(this.adjustDateToUTC(this.selectedDate));
  }
  

  generateTimeSlots() {
    const startHour = 7;
    const endHour = 23;
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

  getScheduleForTimeSlot(timeSlot: { label: string, start: Date, end: Date }): AppointmentSchedule[] {
    return this.schedules.filter(schedule => {
      const scheduleStartTime = new Date(schedule.start_time);
      const scheduleEndTime = new Date(schedule.end_time);
      return scheduleStartTime >= timeSlot.start && scheduleEndTime <= timeSlot.end;
    });
  } 

  fetchSchedules(date: string) {
    this.appointmentService.getSchedulesByDate(date).then(
      (schedules: AppointmentSchedule[]) => {
        this.schedules = schedules;
        console.log('Fetched Schedules:', this.schedules); // Debugging line
      },
      (error) => {
        this.snackBar.open('Failed to fetch schedules', '', { duration: 3000 });
      }
    );
  }
  
  onDateChange(date: Date) {
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    this.fetchSchedules(this.adjustDateToUTC(date));
  }
  
  
  adjustDateToUTC(date: Date): string {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() - userTimezoneOffset);
    return adjustedDate.toISOString().split('T')[0];
  }
  
  updateStatus(event: Event, appointmentId: number) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
        const newStatus = selectElement.value;
        this.appointmentService.updateAppointmentStatus(appointmentId, newStatus).then(
            () => {
                this.snackBar.open('Status updated successfully', '', { duration: 3000 });
                this.fetchSchedules(this.adjustDateToUTC(this.selectedDate)); // Refresh the schedules
            },
            (error) => {
                this.snackBar.open('Failed to update status', '', { duration: 3000 });
            }
        );
    }
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