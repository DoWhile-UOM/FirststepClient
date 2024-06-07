import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylemanageService {
  private styles: { [key: string]: string } = {};

  setStyle(key: string, value: string): void {
    this.styles[key] = value;
    document.documentElement.style.setProperty(`--${key}`, value);
  }

  getStyle(key: string): string {
    return this.styles[key];
  }
}
