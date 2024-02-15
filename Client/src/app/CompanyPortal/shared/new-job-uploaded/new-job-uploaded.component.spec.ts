import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobUploadedComponent } from './new-job-uploaded.component';

describe('NewJobUploadedComponent', () => {
  let component: NewJobUploadedComponent;
  let fixture: ComponentFixture<NewJobUploadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewJobUploadedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewJobUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
