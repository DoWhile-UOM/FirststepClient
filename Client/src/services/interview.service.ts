import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

interface Record {
  id: number;
  date: string;
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private recordsKey = 'records';
  private lastIdKey = 'lastId';

  constructor() {
  }

  start() {
    console.log('Interview Service Started');
    this.addRecord({
      date: '2024/06/20',
      start: 800,
      end: 1200,
    });
    this.addRecord({
      date: '2024/06/21',
      start: 1000,
      end: 1200,
    });
    console.log('divide Service Started');
    this.divideAndPost(1, 30);


  }

  //Local Storage Handling Functions
  private getLastId(): number {
    const lastId = localStorage.getItem(this.lastIdKey);
    return lastId ? JSON.parse(lastId) : 0;
  }

  private setLastId(id: number): void {
    localStorage.setItem(this.lastIdKey, JSON.stringify(id));
  }

  private getRecords(): Record[] {
    const records = localStorage.getItem(this.recordsKey);
    return records ? JSON.parse(records) : [];
  }

  private addRecord(newRecord: Omit<Record, 'id'>): void {
    const records = this.getRecords();
    const lastId = this.getLastId();
    const recordWithId = { ...newRecord, id: lastId + 1 };
    records.push(recordWithId);
    localStorage.setItem(this.recordsKey, JSON.stringify(records));
    this.setLastId(lastId + 1);
  }

  private divideTimeslot(record: Record, interval: number): { start: string; end: string }[] {
    const slots = [];
    const start = parseInt(record.start, 10);
    const end = parseInt(record.end, 10);
    for (let current = start; current < end; current += interval) {
      const next = Math.min(current + interval, end);
      slots.push({
        start: this.formatTime(current),
        end: this.formatTime(next),
      });
    }
    return slots;
  }

  private formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 100);
    const mins = minutes % 100;
    return `${hours.toString().padStart(2, '0')}${mins.toString().padStart(2, '0')}`;
  }

  allocate(): void {
    const recordId = 1;  // Example record ID
    const interval = 30; // Interval in minutes
    this.divideAndPost(recordId, interval);
  }

  private divideAndPost(recordId: number, interval: number): void {
    const records = this.getRecords();
    const record = records.find(rec => rec.id === recordId);
    if (record) {
      const slots = this.divideTimeslot(record, interval);
      slots.forEach(slot => {
        //this.postTimeslot(slot);
        console.log(slot);
      });
    } else {
      console.error('Record not found');
    }
  }


}
