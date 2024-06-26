import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

interface Record {
  id: number;
  day: string;
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor() {
  }

  postRecords(records: Record[], duration: number): void{
    let allSlots: string[] = [];
  
    records.forEach(record => {
      const slots = this.splitIntoSlots(record, duration);
      allSlots = allSlots.concat(slots);
    });

    console.log(allSlots);
  }


  splitIntoSlots(slot: { id: number, day: string, start: number, end: number }, duration: number): string[] {
    const timeSlots = [];
    const startHour = Math.floor(slot.start / 100);
    const startMinutes = slot.start % 100;
    const endHour = Math.floor(slot.end / 100);
    const endMinutes = slot.end % 100;
    let currentHour = startHour;
    let currentMinutes = startMinutes;

    const dayString = `${slot.day.substring(0, 4)}-${slot.day.substring(4, 6)}-${slot.day.substring(6, 8)}`;

    while (currentHour * 100 + currentMinutes < slot.end) {
      const nextMinutes = (currentMinutes + duration) % 60;
      const nextHour = currentMinutes + duration >= 60 ? currentHour + 1 : currentHour;

      const startTime = currentHour * 100 + currentMinutes;
      const endTime = nextHour * 100 + nextMinutes;

      const isFullSlot = endTime <= slot.end;

      const startDateTime = new Date(`${dayString}T${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}:00`);
      timeSlots.push(startDateTime.toISOString());

      if (!isFullSlot) break;

      currentHour = nextHour;
      currentMinutes = nextMinutes;
    }

    return timeSlots;
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
