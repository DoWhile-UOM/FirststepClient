import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Import the PdfViewerComponent and PdfViewerModule

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent {

  pdfSrc = "src/assets/cv.pdf";

}
