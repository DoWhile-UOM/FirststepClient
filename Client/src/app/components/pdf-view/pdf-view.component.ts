import { Component, Inject, OnInit } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { MatDialogModule, MatDialogContent, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';
import { DialogData } from '../company-application/company-application.component';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule, MatDialogModule, MatDialogContent,], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent implements OnInit{ 
 
  public documentName: string = this.data.documentName;
  public document: any;
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  constructor(private documentService:DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  { }
  
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
