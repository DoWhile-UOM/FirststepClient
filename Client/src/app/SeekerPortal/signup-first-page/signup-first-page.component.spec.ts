import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFirstPageComponent } from './signup-first-page.component';

describe('SignupFirstPageComponent', () => {
  let component: SignupFirstPageComponent;
  let fixture: ComponentFixture<SignupFirstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFirstPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupFirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
