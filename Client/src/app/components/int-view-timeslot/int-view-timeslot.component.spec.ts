import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntViewTimeslotComponent } from './int-view-timeslot.component';

describe('IntViewTimeslotComponent', () => {
  let component: IntViewTimeslotComponent;
  let fixture: ComponentFixture<IntViewTimeslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntViewTimeslotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntViewTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
