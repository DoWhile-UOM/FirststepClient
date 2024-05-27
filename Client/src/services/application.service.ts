import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor() {}

  async submitSeekerApplication(applicationData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        Apipaths.submitApplication,
        applicationData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error submiting application: ', error);
    }
  }
}
