import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import * as https from 'https';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  private axiosInstance = axios.create({
    baseURL: 'https://localhost:7213/api',
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

  constructor(private http: HttpClient) { }

  async getSeekerDetails(id: number) {
    let seekerData: any;

    await this.axiosInstance.get(`/Seeker/GetSeeker/${id}`)
      .then((response) => {
        seekerData = response.data;
      })
      .catch(function (error) {
        console.log("Network Error in getSeekerDetails : " + error);
      });

    return seekerData;
  }

  async getSeekerDetailsForApplication(id: number) {
    let seekerData: any;

    await this.axiosInstance.get(`/Seeker/GetSeekerDetailsForApplication/${id}`)
      .then((response) => {
        seekerData = response.data;
      })
      .catch(function (error) {
        console.log("Network Error: " + error);
      });

    return seekerData;
  }

  async editSeeker(seeker: any, seekerID: number) {
    try {
      await this.axiosInstance.put(`/Seeker/UpdateSeeker/${seekerID}`, seeker)
        .then((response) => {
          console.log(response);
        });
      console.log("Seeker updated successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSeeker(seekerID: number) {
    try {
      await this.axiosInstance.delete(`/Seeker/DeleteSeeker/${seekerID}`);
      console.log("Seeker deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }

  SeekerRegister(seeker: any) {
    return this.http.post<any>('https://localhost:7213/api/Seeker/AddSeeker', seeker);
  }

  async addSeeker(seeker: any) {
    try {
      await this.axiosInstance.post('/Seeker/AddSeeker', seeker)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }
}
