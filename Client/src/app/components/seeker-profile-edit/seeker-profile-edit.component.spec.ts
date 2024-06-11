import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerProfileEditComponent } from './seeker-profile-edit.component';

describe('SeekerProfileEditComponent', () => {
  let component: SeekerProfileEditComponent;
  let fixture: ComponentFixture<SeekerProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
