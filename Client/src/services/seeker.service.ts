import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SeekerProfile {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  field_name?: string;
  seekerSkills?: string[];
  cvFile?: File;

}
export interface SeekerProfileViewDto {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  user_id: number;
  cVurl: string;
  field_name?: string;
  seekerSkills?: string[];
}


@Injectable({
  providedIn: 'root'
})

export class SeekerService {
  
constructor(private http: HttpClient,private snackbar: MatSnackBar) { }

async getSeekerDetails(id: number) {
  try {
    const response = await axios.get(Apipaths.getSeekerDetails + id);
    return response.data;
  } catch (error) {
    this.snackbar.open('Error getting seeker details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  }
}

async getSeekerProfile(id: number): Promise<SeekerProfileViewDto> {
  let seekerData: SeekerProfileViewDto;
  await axios.get(Apipaths.getSeekerProfile + id)
    .then((response) => {
      seekerData = response.data;
    })
    .catch((error) => {
      this.snackbar.open('Error getting seeker profile', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    });
  return seekerData!;
}


async getSeekerDetailsForApplication(id : number) {
  let seekerData: any;
  
  await axios.get(Apipaths.getSeekerDetailsForApplication  + id)
    .then((response) => {
      seekerData = response.data;
    })
    .catch ((error) => {
      this.snackbar.open('Error getting seeker details', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    });;

  return seekerData;
}

async getSeekerEditProfile(id: number) {
  try {
    const response = await axios.get(Apipaths.getSeekerEditProfile + id);
    return response.data as SeekerProfile;
  } catch (error) {
    throw error;
  }
}

async editSeeker(formData: FormData, seekerID: number) {
  try {
    const response = await axios.put(Apipaths.editSeeker + seekerID, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    this.snackbar.open('Error updating seeker', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  }
}


async updateProfilePicture(file: File, user_id: number) {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('user_id', user_id.toString());
  await axios.patch(Apipaths.updateProfilePicture + 'companyId=' + user_id, formData).then((response) => {
    this.snackbar.open('Company logo updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
  }
  ).catch((error) => {
    this.snackbar.open('Error updating company logo', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  });
}

//delete method
async deleteSeeker(seekerID: number) {
  try {
    await axios.delete(Apipaths.deleteSeeker + seekerID);
  } catch (error) {
    ///console.error(error);
  }
}

//register method
SeekerRegister(seeker:any){
  return this.http.post<any>(Apipaths.addSeeker,seeker);
}

//add method
async addseeker(seeker: any) {
  try {
    await axios.post(Apipaths.addSeeker, seeker)
     .then((response) => {
      this.snackbar.open('Seeker added successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
     });
  } catch (error) {
    this.snackbar.open('Error adding seeker', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
  }
}

}