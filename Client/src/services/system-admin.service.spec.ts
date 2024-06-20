import { TestBed } from '@angular/core/testing';

import { SystemAdminService } from './system-admin.service';

describe('SystemAdminService', () => {
  let service: SystemAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
