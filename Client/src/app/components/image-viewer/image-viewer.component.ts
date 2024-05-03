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


  async getSasToken(imageName) {
    try {
      const response = await fetch(`/api/images/sas/${imageName}`);
      if (!response.ok) {
        throw new Error(`Error fetching SAS token: ${response.statusText}`);
      }
      const sasToken = await response.text();
      console.log("Retrieved SAS token:", sasToken);
    } catch (error) {
      console.error("Error getting SAS token:", error);
    }
  }
  

  getSasToken(imageName) ;
 




}





  




