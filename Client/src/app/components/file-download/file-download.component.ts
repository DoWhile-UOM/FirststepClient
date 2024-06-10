import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';

@Component({
    selector: 'app-file-download',
    standalone: true,
    templateUrl: './file-download.component.html',
    styleUrl: './file-download.component.css',
    imports: [MatIconModule,MatButtonModule]
})
export class FileDownloadComponent {
document: any;
documentName = 'sample.pdf';

constructor(
    private documentService: DocumentService,

) {} 
  ngOnInit(): void {

}

}
