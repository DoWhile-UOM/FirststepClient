import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerApplicationFormConfirmComponent } from './seeker-application-form-confirm.component';

describe('SeekerApplicationFormConfirmComponent', () => {
  let component: SeekerApplicationFormConfirmComponent;
  let fixture: ComponentFixture<SeekerApplicationFormConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerApplicationFormConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerApplicationFormConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
