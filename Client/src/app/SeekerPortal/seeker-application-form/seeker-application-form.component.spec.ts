import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerApplicationFormComponent } from './seeker-application-form.component';

describe('SeekerApplicationFormComponent', () => {
  let component: SeekerApplicationFormComponent;
  let fixture: ComponentFixture<SeekerApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
