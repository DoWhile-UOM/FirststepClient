import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { PdfViewerComponent } from "../pdf-viewer/pdf-viewer.component";

@Component({
    selector: 'app-file-download',
    standalone: true,
    templateUrl: './file-download.component.html',
    styleUrl: './file-download.component.css',
    imports: [MatIconModule, PdfViewerComponent]
})
export class FileDownloadComponent {

}
