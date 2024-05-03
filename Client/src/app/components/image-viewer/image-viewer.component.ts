import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';





@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css'
})
export class ImageViewerComponent  {
imageUrl: any;

constructor(private documentService:DocumentService) { }

ngOnInit(): void {
  const blobName = 'angry.jpeg'; // Replace with the actual blob name

  this.documentService.getBlobUrl(blobName).subscribe(
    imageUrl => {
      this.imageUrl = imageUrl; // Set the fetched image URL
    },
    error => {
      console.error('Error fetching image URL:', error);
    }
  );

}


/*  imageUrl: string;

  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {
    const blobName = 'angry.jpeg'; // Replace with the actual blob name

    this.documentService.get(blobName).subscribe(
      imageUrl => {
        this.imageUrl = imageUrl; // Set the fetched image URL
      },
      error => {
        console.error('Error fetching image URL:', error);
      }
    );*/
  }




