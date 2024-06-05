import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  constructor() { }

  async addRevision(applicationId: number, comment: string, status: string, employeeId: number) {
    const newRevision = {
      application_id: applicationId,
      comment: comment,
      status: status,
      employee_id: employeeId,
      date: new Date()  // Ensure the date is sent
    };

    try {
      const response = await axios.post('https://localhost:7213/api/Revision/CreateRevision', newRevision);
      console.log('Revision added successfully:', response.data);
    } catch (error) {
      console.error('Error adding revision:', error);
    }
  }

  async getRevisionHistory(applicationId: number) {
    let revisionHistory: any = {};
    await axios.get(`https://localhost:7213/api/Revision/GetRevisionHistory/${applicationId}`)
      .then((response) => {
        revisionHistory = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return revisionHistory;
  }
}
