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
import { MatSelectChange } from '@angular/material/select';

interface AppointmentSchedule {
  appointment_id: number;
  first_name: string;
  last_name: string;
  title: string;
  status: string;
  start_time: string;
  end_time: string;
  // seeker_id?: number;
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
  upNextSchedule: AppointmentSchedule | null = null;
  todaySchedules: AppointmentSchedule[] = [];
  noMoreSchedulesMessage: string = '';

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchSchedules(this.adjustDateToUTC(this.selectedDate));
    this.fetchTodaySchedules();
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    this.snackBar.open(`Selected date: ${date.toDateString()}`, '', { duration: 3000 });
    this.fetchSchedules(this.adjustDateToUTC(date));
  }
  

  generateTimeSlotsForSelectedDate() {
    this.timeSlots = [];
    const startHour = 0; // Start from midnight
    const endHour = 23; // End at 11 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const start = new Date(this.selectedDate);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(hour + 1, 0, 0, 0);
      const timeLabel = `${start.getHours() % 12 === 0 ? 12 : start.getHours() % 12}:00${start.getHours() < 12 ? 'am' : 'pm'}`;

      this.timeSlots.push({ label: timeLabel, start, end });
    }
  }

  getScheduleForTimeSlot(timeSlot: { label: string, start: Date, end: Date }): AppointmentSchedule[] {
    return this.schedules.filter(schedule => {
      const scheduleStartTime = new Date(schedule.start_time);
      const scheduleEndTime = new Date(schedule.end_time);
      return scheduleStartTime < timeSlot.end && scheduleEndTime > timeSlot.start;
    });
  }

  fetchTodaySchedules() {
    const today = new Date();
    this.appointmentService.getSchedulesByDate(this.adjustDateToUTC(today)).then(
      (schedules: AppointmentSchedule[]) => {
        this.todaySchedules = schedules;
        this.loadTodaySchedules();
        this.generateTimeSlotsForSelectedDate();  // Generate time slots based on today's schedules
      },
      (error) => {
        this.snackBar.open('Failed to fetch today\'s schedules', '', { duration: 3000 });
      }
    );
  }

  fetchSchedules(date: string) {
    this.appointmentService.getSchedulesByDate(date).then(
      (schedules: AppointmentSchedule[]) => {
        this.schedules = schedules;
        this.generateTimeSlotsForSelectedDate();  // Generate time slots based on the fetched schedules
      },
      (error) => {
        this.snackBar.open('Failed to fetch schedules', '', { duration: 3000 });
      }
    );
  }

  loadTodaySchedules() {
    const todayDate = new Date().toDateString();
    this.todaySchedules = this.todaySchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.start_time).toDateString();
      return scheduleDate === todayDate;
    });

    const currentTime = new Date();
    this.upNextSchedule = this.todaySchedules.find(schedule => new Date(schedule.start_time) > currentTime) || null;

    if (!this.upNextSchedule) {
      this.noMoreSchedulesMessage = 'There are no more scheduled interviews today.';
    } else {
      this.noMoreSchedulesMessage = '';
    }
  }

  adjustDateToUTC(date: Date): string {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() - userTimezoneOffset);
    return adjustedDate.toISOString().split('T')[0];
  }

  updateStatus(event: MatSelectChange, appointmentId: number) {
    const newStatus = event.value;
    this.appointmentService.updateAppointmentStatus(appointmentId, newStatus).then(
      () => {
        this.snackBar.open('Status updated successfully', '', { duration: 3000 });
        this.fetchSchedules(this.adjustDateToUTC(this.selectedDate));
      },
      (error) => {
        this.snackBar.open('Failed to update status', '', { duration: 3000 });
      }
    );
  }

  getStyleForSchedule(schedule: AppointmentSchedule) {
    const scheduleStartTime = new Date(schedule.start_time);
    const scheduleEndTime = new Date(schedule.end_time);
    const startHour = scheduleStartTime.getHours();
    const startMinutes = scheduleStartTime.getMinutes();
    const endHour = scheduleEndTime.getHours();
    const endMinutes = scheduleEndTime.getMinutes();
  
    const totalMinutesInDay = 24 * 60;
    const startTotalMinutes = startHour * 60 + startMinutes;
    const endTotalMinutes = endHour * 60 + endMinutes;
  
    const top = (startTotalMinutes / totalMinutesInDay) * 100;
    const height = ((endTotalMinutes - startTotalMinutes) / totalMinutesInDay) * 100;
  
    return {
      top: `${top}%`,
      height: `${height}%`,
      left: '8%',
      right: '0%',
      position: 'absolute'
    };
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

  // viewSeekerProfile(seekerId: number | undefined) {
  //   if (seekerId) {
  //     this.router.navigate([`/seeker-profile/${seekerId}`]);
  //   }
  // }
  

  