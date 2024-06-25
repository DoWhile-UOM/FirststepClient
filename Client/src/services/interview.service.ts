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

  splitIntoSlots(slot: { id: number, day: string, start: number, end: number }, duration: number): { id: number, day: string, start: number, end: number, full: boolean }[] {
    const timeSlots = [];
    const startHour = Math.floor(slot.start / 100);
    const startMinutes = slot.start % 100;
    const endHour = Math.floor(slot.end / 100);
    const endMinutes = slot.end % 100;
    let currentHour = startHour;
    let currentMinutes = startMinutes;

    while (currentHour * 100 + currentMinutes < slot.end) {
      const nextMinutes = (currentMinutes + duration) % 60;
      const nextHour = currentMinutes + duration >= 60 ? currentHour + 1 : currentHour;

      const startTime = currentHour * 100 + currentMinutes;
      const endTime = nextHour * 100 + nextMinutes;

      const isFullSlot = endTime <= slot.end;

      timeSlots.push({
        id: slot.id,
        day: slot.day,
        start: startTime,
        end: isFullSlot ? endTime : slot.end,
        full: isFullSlot
      });

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



}
