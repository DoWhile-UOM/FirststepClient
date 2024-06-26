import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

interface Record {
  id: number;
  day: string; // Assuming this is in "YYYY-MM-DD" format
  start: number; // Start time in hours (24-hour format)
  end: number; // End time in hours (24-hour format)
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  slots:string[]=[];
  constructor() {
  }

  splitIntoSlots(slot: { id: number, day: string, start: number, end: number }, duration: number):void {
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
        this.slots.push(timeString);
      }

      currentHour = nextHour;
      currentMinutes = nextMinutes;
    }

  }




  postSplittedTimeSlots(records: Record[], duration: number) {
    records.forEach((record: Record) => {
      console.log(record);
  });
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



}
