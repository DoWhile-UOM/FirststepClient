import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AppointmentSchedule {
  appointment_id: number;
  first_name: string;
  last_name: string;
  title: string;
  status: string;
  start_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private snackbar: MatSnackBar) {}

  async getSchedulesByDate(date: Date): Promise<AppointmentSchedule[]> {
    const formattedDate = date.toISOString().split('T')[0];
    try {
      const response = await axios.get(`https://localhost:7213/api/Appointment/GetByDate/${formattedDate}`);
      // const response = await axios.get(`${this.apiUrl}/${formattedDate}`);
      return response.data.map((schedule: any) => ({
        ...schedule,
        status: this.mapStatus(schedule.status), // Map enum to string
        first_name: schedule.first_name || 'N/A', // Handle null values
        last_name: schedule.last_name || 'N/A', // Handle null values
        end_time: schedule.end_time // Ensure end_time is included
      }));
    } catch (error) {
      console.error("Network Error: " + error);
      throw error;
    }
  }

  async updateAppointmentStatus(appointmentId: number, status: string): Promise<void> {
    try {
      await axios.patch(`https://localhost:7213/api/Appointment/UpdateStatus/appointment=${appointmentId}/status=${status}`);
      this.snackbar.open('Status updated successfully', '', { duration: 3000 });
    } catch (error) {
      console.error("Network Error: " + error);
      this.snackbar.open('Failed to update status', '', { duration: 3000 });
      throw error;
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