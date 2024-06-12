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
  }
}

async getSeekerProfile(id: number) {
  try {
    const response = await axios.get(Apipaths.getSeekerProfile + id);
    return response.data as SeekerProfile;
  } catch (error) {
    console.error("Error fetching seeker profile: ", error);
    throw error;
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

async getSeekerEditProfile(id: number) {
  try {
    const response = await axios.get(Apipaths.getSeekerEditProfile + id);
    return response.data as SeekerProfile;
  } catch (error) {
    console.error("Error fetching seeker profile: ", error);
    throw error;
  }
}

async editSeeker(seeker: SeekerProfile, seekerID: number) {
  try {
    const formData = new FormData();
    formData.append('email', seeker.email);
    formData.append('first_name', seeker.first_name);
    formData.append('last_name', seeker.last_name);
    formData.append('phone_number', seeker.phone_number.toString());
    formData.append('bio', seeker.bio);
    formData.append('description', seeker.description);
    formData.append('university', seeker.university);
    formData.append('cVurl', seeker.cVurl);
    formData.append('profile_picture', seeker.profile_picture);
    formData.append('linkedin', seeker.linkedin);
    formData.append('field_id', seeker.field_id.toString());
    if (seeker.cvFile) {
      formData.append('cvFile', seeker.cvFile);
      formData.append('cVurl', ''); // Indicate a new CV is uploaded
    } else {
      formData.append('cVurl', seeker.cVurl);
    }
    if (seeker.seekerSkills) {
      formData.append('seekerSkills', JSON.stringify(seeker.seekerSkills));
    }

    const response = await axios.put(Apipaths.editSeeker + seekerID, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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
    await axios.delete(Apipaths.deleteSeeker + seekerID);
    console.log("seeker deleted successfully");
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
       console.log(response);
     });
  } catch (error) {
    console.error(error);
  }
}

}