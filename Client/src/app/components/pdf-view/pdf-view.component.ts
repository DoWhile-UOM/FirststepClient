import { Component } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { MatDialogModule, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule,MatDialogModule, MatDialogContent,], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent { 

  constructor(
  ) { }
  public document: string = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
}
