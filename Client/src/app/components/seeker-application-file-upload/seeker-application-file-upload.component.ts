import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-seeker-application-file-upload',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './seeker-application-file-upload.component.html',
  styleUrl: './seeker-application-file-upload.component.css'
})
export class SeekerApplicationFileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  uploadInProgress=false;
  uploadSuccess=false;
 
  
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

}
