import { Component } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent { 
  public document: string = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
}
