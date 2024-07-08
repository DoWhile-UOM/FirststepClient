import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaInterviewStatComponent } from './ca-interview-stat.component';

describe('CaInterviewStatComponent', () => {
  let component: CaInterviewStatComponent;
  let fixture: ComponentFixture<CaInterviewStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaInterviewStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaInterviewStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
