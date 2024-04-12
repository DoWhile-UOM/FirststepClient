import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'https://localhost:7093/api';

  constructor(private http: HttpClient) {}

  async upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    await axios.post(`${this.baseUrl}/Attachment`, formData);

    alert('File uploaded successfully');

  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Attachment`);
  }
}
