import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { AdvertisementActionsComponent } from '../app/components/advertisement-actions/advertisement-actions.component';


interface Record {
  id: number;
  day: string; // Assuming this is in "YYYY-MM-DD" format
  start: number; // Start time in hours (24-hour format)
  end: number; // End time in hours (24-hour format)
}

interface Appointment {
  appointment_id: number;
  start_time: string;
}

interface advertisement {
  details: advertisementDetials;
  slot: Appointment[];
}

interface advertisementDetials {
  interview_duration: number;
  title: string;
  company_name: string;
}


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  slots: string[] = [];
  constructor() {
  }

  splitIntoSlots(slot: { id: number, day: string, start: number, end: number }, duration: number): void {
    const timeSlots = [];
    const startHour = Math.floor(slot.start / 100);
    const startMinutes = slot.start % 100;
    let currentHour = startHour;
    let currentMinutes = startMinutes;

    const formatTime = (hour: number, minutes: number) => {
      const hourString = hour.toString().padStart(2, '0');
      const minuteString = minutes.toString().padStart(2, '0');
      return `${hourString}:${minuteString}:00.000Z`;
    };

    while (currentHour * 100 + currentMinutes < slot.end) {
      const nextMinutes = (currentMinutes + duration) % 60;
      const nextHour = currentMinutes + duration >= 60 ? currentHour + 1 : currentHour;

      const startTime = currentHour * 100 + currentMinutes;
      const endTime = nextHour * 100 + nextMinutes;

      if (endTime <= slot.end) {
        const timeString = `${slot.day}T${formatTime(currentHour, currentMinutes)}`;
        const dateFromString = new Date(timeString);
        //console.log(timeString);
        const isoStringFromString = dateFromString.toISOString();
        this.slots.push(isoStringFromString);
      }

      currentHour = nextHour;
      currentMinutes = nextMinutes;
    }

  }




  async postSplittedTimeSlots(records: Record[], duration: number, advertisement_id: number, company_id: number) {
    records.forEach((record: Record) => {
      this.splitIntoSlots(record, duration);
    });
    console.log(this.slots);

    const slotRequest: any = {
      company_id: company_id,
      advertisement_id: advertisement_id,
      duration: duration,
      time_slots: this.slots
    };

    try {
      const response = await axios.post(Apipaths.CreateAppointmentSlot, slotRequest);
    } catch (error: any) {
      console.error('Network Error: ', error);;
    }

  }

  checkForOverlaps(records: Record[], input: Record): Record[] {
    const overlaps: Record[] = [];

    // Iterate through existing records to check for overlaps
    for (const record of records) {
      if (record.day === input.day) {
        // Check if the time ranges overlap
        const startOverlap = input.start < record.end;
        const endOverlap = input.end > record.start;

        if (startOverlap && endOverlap) {
          overlaps.push(record);
        }
      }
    }

    return overlaps;
  }

  arrangeByStartTime(records: Record[]): Record[] {
    // Group records by day
    const groupedRecords: { [day: string]: Record[] } = {};

    records.forEach(record => {
      if (!groupedRecords[record.day]) {
        groupedRecords[record.day] = [];
      }
      groupedRecords[record.day].push(record);
    });

    // Sort records within each group by start time
    for (const day in groupedRecords) {
      groupedRecords[day].sort((a, b) => a.start - b.start);
    }

    // Flatten the grouped records back into a single array
    const sortedRecords: Record[] = [];
    for (const day in groupedRecords) {
      sortedRecords.push(...groupedRecords[day]);
    }

    return sortedRecords;
  }

  async getAvailableSlots(AdvertisementId: number): Promise<advertisement> {
    let appointments: Appointment[] = [];
    let addetails: advertisementDetials = { interview_duration: 0, title: '', company_name: '' };
    let advertisement: advertisement = { details: addetails, slot: appointments };
    try {
      const response = await axios.get(Apipaths.GetFreeAppointmentSlot + AdvertisementId);

      appointments = response.data["slot"] as Appointment[];
      addetails["interview_duration"] = response.data["interview_duration"];
      addetails["title"] = response.data["title"];
      addetails["company_name"] = response.data["company_name"];
      advertisement["slot"] = appointments;
      advertisement["details"] = addetails;

    } catch (error: any) {
      console.error('Network Error: ', error);
    }
    return advertisement;
  }

  async getAvailableSlots2(AdvertisementId: number): Promise<advertisement> {
    let appointments: Appointment[] = [];
    let addetails: advertisementDetials = { interview_duration: 0, title: '', company_name: '' };
    let advertisement: advertisement = { details: addetails, slot: appointments };

    const response = await axios.get(Apipaths.GetFreeAppointmentSlot + AdvertisementId);
    appointments = response.data["slot"] as Appointment[];
    addetails["interview_duration"] = response.data["interview_duration"];
    addetails["title"] = response.data["title"];
    addetails["company_name"] = response.data["company_name"];
    advertisement["slot"] = appointments;
    advertisement["details"] = addetails;
    return advertisement;
  }

  async bookSlotSeeker(AdvertisementId: number): Promise<advertisement> {
    let appointments: Appointment[] = [];
    let addetails: advertisementDetials = { interview_duration: 0, title: '', company_name: '' };
    let advertisement: advertisement = { details: addetails, slot: appointments };
    try {
      const response = await axios.get(Apipaths.GetFreeAppointmentSlot + AdvertisementId);

      appointments = response.data["slot"] as Appointment[];
      addetails["interview_duration"] = response.data["interview_duration"];
      addetails["title"] = response.data["title"];
      addetails["company_name"] = response.data["company_name"];
      advertisement["slot"] = appointments;
      advertisement["details"] = addetails;

    } catch (error: any) {
      console.error('Network Error: ', error);
    }
    return advertisement;
  }

}
