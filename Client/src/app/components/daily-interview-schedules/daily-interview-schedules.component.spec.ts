import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInterviewSchedulesComponent } from './daily-interview-schedules.component';

describe('DailyInterviewSchedulesComponent', () => {
  let component: DailyInterviewSchedulesComponent;
  let fixture: ComponentFixture<DailyInterviewSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyInterviewSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyInterviewSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
