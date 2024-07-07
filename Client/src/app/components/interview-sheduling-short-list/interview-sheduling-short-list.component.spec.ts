import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewShedulingShortListComponent } from './interview-sheduling-short-list.component';

describe('InterviewShedulingShortListComponent', () => {
  let component: InterviewShedulingShortListComponent;
  let fixture: ComponentFixture<InterviewShedulingShortListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewShedulingShortListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewShedulingShortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
