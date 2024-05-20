
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seeker-application-file-upload',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './seeker-application-file-upload.component.html',
  styleUrl: './seeker-application-file-upload.component.css'
})
export class SeekerApplicationFileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  selectedFileName: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.fileSelected.emit(file);
    }
  }
}
