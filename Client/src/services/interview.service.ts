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
  private readonly storageKey = 'TimeSlot';
  private readonly idKey = 'lastId';

  constructor() { 
    this.addSlot('2021-07-01', 10, 12);
    this.addSlot('2022-07-01', 12, 13);
  }

  //Local Storage Handling Functions
  private getLastId(): number {
    const lastId = localStorage.getItem(this.idKey);
    return lastId ? JSON.parse(lastId) : 0;
  }

  private setLastId(id: number): void {
    localStorage.setItem(this.idKey, JSON.stringify(id));
  }

  getRecords(): Record[] {
    const records = localStorage.getItem(this.storageKey);
    return records ? JSON.parse(records) : [];
  }

  addRecord(newRecord: Omit<Record, 'id'>): void {
    const records = this.getRecords();
    const lastId = this.getLastId();
    const recordWithId = { ...newRecord, id: lastId + 1 };
    records.push(recordWithId);
    localStorage.setItem(this.storageKey, JSON.stringify(records));
    this.setLastId(lastId + 1);
  }

  removeRecord(id: number): void {
    let records = this.getRecords();
    records = records.filter(record => record.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }

  clearRecords(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.idKey);
  }

  //Interview Service Functions

  addSlot(inDate: string, Istart: number, Iend: number): void {
    const newRecord = {
      date: inDate,
      start: Istart,
      end: Iend,
    };
    this.addRecord(newRecord);
    console.log('Record added:', newRecord);
  }

  getSlot(): void {
    const records = this.getRecords();
    console.log('All records:', records);
  }

  removeSlot(id: number): void {
    this.removeRecord(id);
    console.log(`Record with id ${id} removed`);
  }

  clearSlot(): void {
    this.clearRecords();
    console.log('All records cleared');
  }

}
