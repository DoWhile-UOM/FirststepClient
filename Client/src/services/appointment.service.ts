import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import https from 'https';
import { HttpClient } from '@angular/common/http';


interface AppointmentSchedule {
  appointment_id: number;
  first_name: string;
  last_name: string;
  title: string;
  status: string;
  start_time: string;
  end_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  async getSchedulesByDate(date: Date): Promise<AppointmentSchedule[]> {
    let schedules: AppointmentSchedule[] = [];
    const formattedDate = date.toISOString().split('T')[0];
    try {
      const response = await axios.get(`https://localhost:7213/api/Appointment/GetByDate/${formattedDate}`);
      schedules = response.data.map((schedule: any) => ({
        ...schedule,
        status: this.mapStatus(schedule.status), // Map enum to string
        first_name: schedule.first_name || 'N/A', // Handle null values
        last_name: schedule.last_name || 'N/A', // Handle null values
        end_time: schedule.end_time // Ensure end_time is included
      }));
      console.log('Fetched Schedules:', schedules); // Debugging line
    } catch (error) {
      console.error('Error fetching schedules:', error);
      this.snackBar.open('Failed to fetch schedules', '', { duration: 3000 });
    }
    return schedules;
  }

  async updateAppointmentStatus(appointmentId: number, status: string): Promise<void> {
    try {
      await axios.patch(`https://localhost:7213/api/Appointment/UpdateStatus/appointment=${appointmentId}/status=${status}`);
      this.snackBar.open('Status updated successfully', '', { duration: 3000 });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      this.snackBar.open('Failed to update status', '', { duration: 3000 });
    }
  }

  private mapStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Free';
      case 1:
        return 'Pending';
      case 2:
        return 'Booked';
      case 3:
        return 'Missed';
      case 4:
        return 'Complete';
      default:
        return 'Unknown';
    }
  }
}