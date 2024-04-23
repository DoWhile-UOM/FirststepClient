import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerApplicationStatusComponent } from './seeker-application-status.component';

describe('SeekerApplicationStatusComponent', () => {
  let component: SeekerApplicationStatusComponent;
  let fixture: ComponentFixture<SeekerApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerApplicationStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
