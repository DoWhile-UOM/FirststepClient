import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  constructor() { }

  async addRevision(applicationId: number, comment: string, status: string, employeeId: number, employeeName: string, employeeRole: string) {
    const newRevision = {
      application_id: applicationId,
      comment: comment,
      status: status,
      employee_id: employeeId,
      name: employeeName,
      role: employeeRole,
      date: new Date()
    };

    try {
      await axios.post('https://firststepdowhile.azurewebsites.net/api/Revision/CreateRevision', newRevision);
    } catch (error) {
      console.error('Error adding revision:', error);
    }
  }

  async updateRevision(revision: any) {
    try {
      await axios.put('https://firststepdowhile.azurewebsites.net/api/Revision/UpdateRevision', revision);
    } catch (error) {
      console.error('Error updating revision:', error);
    }
  }


  async getRevisionHistory(applicationId: number) {
    let revisionHistory: any = {};
    await axios
      .get(`https://firststepdowhile.azurewebsites.net/api/Revision/GetRevisionHistory/${applicationId}`)
      .then((response) => {
        revisionHistory = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return revisionHistory;
  }

  async deleteRevision(revisionId: number) {
    try {
      await axios.delete(`https://firststepdowhile.azurewebsites.net/api/Revision/DeleteRevisionById/${revisionId}`);
    } catch (error) {
      console.error('Error deleting revision:', error);
    }
  }
}