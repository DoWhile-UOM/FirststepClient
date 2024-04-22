import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { Apipaths } from './apipaths/apipaths';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  constructor() { }

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
}
