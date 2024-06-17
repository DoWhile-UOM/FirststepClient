import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDelegationPopUpComponent } from './task-delegation-pop-up.component';

describe('TaskDelegationPopUpComponent', () => {
  let component: TaskDelegationPopUpComponent;
  let fixture: ComponentFixture<TaskDelegationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDelegationPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDelegationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
