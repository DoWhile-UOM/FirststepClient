import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantHomeComponent } from './assistant-home.component';

describe('AssistantHomeComponent', () => {
  let component: AssistantHomeComponent;
  let fixture: ComponentFixture<AssistantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssistantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
