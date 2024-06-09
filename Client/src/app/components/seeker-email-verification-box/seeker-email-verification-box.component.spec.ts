import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerEmailVerificationBoxComponent } from './seeker-email-verification-box.component';

describe('SeekerEmailVerificationBoxComponent', () => {
  let component: SeekerEmailVerificationBoxComponent;
  let fixture: ComponentFixture<SeekerEmailVerificationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerEmailVerificationBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerEmailVerificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
