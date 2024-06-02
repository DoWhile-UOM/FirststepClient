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
 
  documentName: string = 'Indexes.pdf';
  constructor(private documentService:DocumentService) { }
  public document: string = "" ;
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  ngOnInit(): void {
  this.documentService.generateSasToken(this.documentName).subscribe(
    (token:string) => {
      this.document= this.documentService.getBlobUrl(this.documentName, token);
      
    },
    error => {
      console.error('Error fetching SAS token:', error);
    }
  );
}



}
