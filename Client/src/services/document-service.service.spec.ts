import { TestBed } from '@angular/core/testing';

import { DocumentServiceService } from './document-service.service';

describe('DocumentServiceService', () => {
  let service: DocumentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
