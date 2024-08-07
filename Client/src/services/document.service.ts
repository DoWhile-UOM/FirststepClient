import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { Apipaths } from './apipaths/apipaths';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  private apiUrl = Apipaths.baseUrl + 'Document';
  private fetchUrl = Apipaths.baseUrl + 'Document/GetSasToken';
  private containerUrl = 'https://firststep.blob.core.windows.net/firststep';



  constructor(private http: HttpClient) { }

  async downloadBlob(eTag: string) {
    const blobServiceClient = new BlobServiceClient(Apipaths.BlobConnectionString);
    const containerClient = blobServiceClient.getContainerClient(Apipaths.BlobContainerName);
    const blobClient = containerClient.getBlobClient(Apipaths.BlobName);

    // Set the If-Match header with the ETag
    const requestOptions = { conditions: { ifMatch: eTag } };

    try {
      const response = await blobClient.download(0, undefined, requestOptions);
      const blobContent = await response.blobBody;

      console.log('Blob downloaded successfully:', blobContent);
    } catch (error) {
      console.error('Error downloading blob:', error);
    }
  }

  uploadFile(file: File) {
    const fileData = new FormData();
    fileData.append('files', file, file.name);

    const headers = new HttpHeaders().set('Accept', '*/*');

    return this.http.post(this.apiUrl, fileData, { headers });
  }


  generateSasToken(blobName: string): Observable<string> {
    const url = `${this.fetchUrl}?blobName=${blobName}`;
    return this.http.get(url, { responseType: 'text' });
  }

  generateBlobUrl(blobName: string, sasToken:string): string {
    return `${this.containerUrl}/${blobName}?${sasToken}`;
  }
}

