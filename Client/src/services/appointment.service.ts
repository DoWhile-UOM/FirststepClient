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
  end_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private snackbar: MatSnackBar) {}

  async getSchedulesByDateAndCompany(date: Date | string, companyId: number): Promise<AppointmentSchedule[]> {
    const formattedDate = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    try {
      const response = await axios.get(Apipaths.baseUrl + `Appointment/GetSchedulesByDateAndCompany/${formattedDate}/Company/${companyId}`);
      return response.data.map((schedule: any) => ({
        ...schedule,
        status: this.mapStatus(schedule.status), // Map enum to string
        first_name: schedule.first_name || 'N/A', // Handle null values
        last_name: schedule.last_name || 'N/A', // Handle null values
        end_time: schedule.end_time // Ensure end_time is included
      }));
    } catch (error) {
      throw error;
    }
  }

  async updateAppointmentStatus(appointmentId: number, status: string): Promise<void> {
    try {
      await axios.patch(Apipaths.baseUrl + `Appointment/UpdateStatus/appointment=${appointmentId}/status=${status}`);
    } catch (error) {
      this.snackbar.open('Failed to update status', "", {panelClass: ['app-notification-error']})._dismissAfter(5000);
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