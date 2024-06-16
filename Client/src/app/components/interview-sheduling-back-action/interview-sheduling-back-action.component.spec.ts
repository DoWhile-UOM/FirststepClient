import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewShedulingBackActionComponent } from './interview-sheduling-back-action.component';

describe('InterviewShedulingBackActionComponent', () => {
  let component: InterviewShedulingBackActionComponent;
  let fixture: ComponentFixture<InterviewShedulingBackActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewShedulingBackActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewShedulingBackActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
