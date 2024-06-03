import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { MatDialogModule, MatDialogContent} from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule, MatDialogModule, MatDialogContent,], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent implements OnInit{ 
 
  documentName: string = '1b2de735-4e1a-48f4-a8ff-9e0a46fb670e.pdf';
  public document: any;
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  constructor(private documentService:DocumentService) { }
  
  ngOnInit(): void {
  this.documentService.generateSasToken(this.documentName).subscribe(
    (token:string) => {
      this.document= this.documentService.getBlobUrl(this.documentName, token);
      console.log('Document URL:', this.document); 
      
    },
    error => {
      console.error('Error fetching SAS token:', error);
    }
  );
}

}
