import { Component } from '@angular/core';
import { RichTextEditorModule, ToolbarService, ImageService, LinkService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [RichTextEditorModule],
  providers: [ToolbarService, LinkService, HtmlEditorService, ImageService],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {

}
