import { Component, EventEmitter, Output,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';import { MatDialogModule, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from '../company-application/company-application.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
  CVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  field_name?: string;
  seekerSkills?: string[];
  cvFile?: File; // New CV file

}


@Component({
  selector: 'app-upload-cv',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,MatProgressSpinnerModule,MatDialogModule,MatDialogContent],
  templateUrl: './upload-cv.component.html',
  styleUrl: './upload-cv.component.css'
})
export class UploadCvComponent {
  SeekerDetails: SeekerProfile = {} as SeekerProfile;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<UploadCvComponent>)
  { }

  @Output() fileSelected = new EventEmitter<File>();
  uploadInProgress=false;
  uploadSuccess=false;
 
  onCvSelected(file: File) {
    this.SeekerDetails.cvFile = file;
  }
  
async onFileSelected($event: Event) {
  const input = $event.target as HTMLInputElement;
  if(input.files && input.files.length > 0) {
    this.uploadInProgress=true;
    this.uploadSuccess=false;
    const file = input.files[0];
    
    try{
      await this.fileUploadSimulate(file);
      this.uploadSuccess=true;
      this.fileSelected.emit(file);
    }
    catch(error){
      console.error('Error uploading file: ', error);
    }
    finally{
      this.uploadInProgress=false;
  }
}
}
  fileUploadSimulate(file: File): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
