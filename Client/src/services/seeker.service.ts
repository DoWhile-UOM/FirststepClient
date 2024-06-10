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
}


@Injectable({
  providedIn: 'root'
})

export class SeekerService {
  
constructor(private http: HttpClient,private snackbar: MatSnackBar) { }

async getSeekerDetails(id: number) {
  try {
    const response = await axios.get('https://localhost:7213/api/Seeker/GetSeeker/' + id);
    return response.data;
  } catch (error) {
    //console.error("Network Error in getSeekerDetails: ");
  }
}

// async getSeekerDetails(id : number) {
//   let seekerData: any;
  
//   await axios.get('https://localhost:7213/api/Seeker/GetSeeker/' + id)
//     .then((response) => {
//       seekerData = response.data;
//     })
//     .catch (function (error) {
//       console.log("Network Error in getSeekerDetails : " + error);
//     });;

//   return seekerData;
// }

async getSeekerDetailsForApplication(id : number) {
  let seekerData: any;
  
  await axios.get(Apipaths.getSeekerDetailsForApplication  + id)
    .then((response) => {
      seekerData = response.data;
    })
    .catch (function (error) {
      console.log("Network Error: " + error);
    });;

  return seekerData;
}

async getSeekerProfile(id: number) {
  try {
    const response = await axios.get(`https://localhost:7213/api/Seeker/GetSeekerProfile/${id}`);
    return response.data as SeekerProfile;
  } catch (error) {
    console.error("Error fetching seeker profile: ", error);
    throw error;
  }
}

async editSeeker(seeker: SeekerProfile, seekerID: number) {
  try {
    const response = await axios.put(`https://localhost:7213/api/Seeker/UpdateSeeker/${seekerID}`, seeker);
    console.log("Seeker updated successfully", response);
  } catch (error) {
    console.error("Error updating seeker: ", error);
    throw error;
  }
}

// async updateProfilePicture(file: File, user_id: number) {
//   const formData: FormData = new FormData();
//   formData.append('file', file);
//   formData.append('user_id', user_id.toString());
//   await axios.patch(Apipaths.updateProfilePicture + 'companyId=' + user_id, formData).then((response) => {
//     this.snackbar.open('Company logo updated successfully', "", { panelClass: ['app-notification-normal'] })._dismissAfter(3000);
//   }
//   ).catch((error) => {
//     this.snackbar.open('Error updating company logo', "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
//   });


//delete method
async deleteSeeker(seekerID: number) {
  try {
    await axios.delete('https://localhost:7213/api/Seeker/DeleteSeeker/' + seekerID);
    console.log("seeker deleted successfully");
  } catch (error) {
    ///console.error(error);
  }
}

//register method
SeekerRegister(seeker:any){
  return this.http.post<any>('https://localhost:7213/api/Seeker/AddSeeker',seeker)
}

//add method
async addseeker(seeker: any) {
  try {
    await axios.post('https://localhost:7213/api/Seeker/AddSeeker', seeker)
     .then((response) => {
       console.log(response);
     });
  } catch (error) {
    console.error(error);
  }
}

}