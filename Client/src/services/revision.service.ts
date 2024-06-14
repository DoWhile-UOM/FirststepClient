import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';

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
      await axios.post(Apipaths.addRevision, newRevision);
     } catch (error) {
      console.error('Error adding revision:', error);
    }
  }

  async updateRevision(revision: any) {
    try {
      await axios.put(Apipaths.updateRevision, revision);
    } catch (error) {
      console.error('Error updating revision:', error);
    }
  }


  async getRevisionHistory(applicationId: number) {
    let revisionHistory: any = {};
    await axios
      .get(Apipaths.getRevisionHistory + applicationId)
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
      await axios.delete( Apipaths.deleteRevision + revisionId);
    } catch (error) {
      console.error('Error deleting revision:', error);
    }
  }
}