import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import{NgIf} from '@angular/common';



@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css'
})

export class ImageViewerComponent implements OnInit {

blobName: string = 'angry.jpeg';
imageUrl: any;

constructor(private documentService:DocumentService) { }

ngOnInit(): void {
  this.documentService.generateSasToken(this.blobName).subscribe(
    (token:string) => {
      this.imageUrl= this.documentService.getBlobUrl(this.blobName, token);
      
    },
    error => {
      console.error('Error fetching SAS token:', error);
    }
  );
}

  }




