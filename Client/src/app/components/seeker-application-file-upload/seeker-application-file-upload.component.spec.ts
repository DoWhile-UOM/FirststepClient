import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerApplicationFileUploadComponent } from './seeker-application-file-upload.component';

describe('SeekerApplicationFileUploadComponent', () => {
  let component: SeekerApplicationFileUploadComponent;
  let fixture: ComponentFixture<SeekerApplicationFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerApplicationFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerApplicationFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
