import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="container">
      <img src="../../../assets/images/404.png" alt="Broken Link Icon" class="broken-link-icon"/>
      <div class="message-large">Page Not Found!</div>
      <div class="message-small">The curse of the broken link has been unleashed.</div>
      <button mat-raised-button color="primary" (click)="goBack()">Go Back</button>
    </div>
  `,
  styles: `
    .container {
      width: 50%;
      position: relative;
      margin: 0 auto;
      padding-top: 10%;
    }

    .message-large {
      font-size: 40px;
      color: black;
      font-weight: 400;
      margin-top: 1em;
    }

    .message-small {
      font-size: 25px;
      color: black;
      font-weight: 300;
      margin-top: 1em;
    }

    .broken-link-icon {
      width: 120px;
      height: 120px;
    }

    button{
      margin-top: 2em;
    }
  `
})
export class PageNotFoundComponent {
  goBack(){
    window.history.back();
  }
}
