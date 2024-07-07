import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewShedulingHeaderComponent } from './interview-sheduling-header.component';

describe('InterviewShedulingBackActionComponent', () => {
  let component: InterviewShedulingHeaderComponent;
  let fixture: ComponentFixture<InterviewShedulingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewShedulingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewShedulingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
