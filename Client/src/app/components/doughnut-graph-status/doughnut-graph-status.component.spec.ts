import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutGraphStatusComponent } from './doughnut-graph-status.component';

describe('DoughnutGraphStatusComponent', () => {
  let component: DoughnutGraphStatusComponent;
  let fixture: ComponentFixture<DoughnutGraphStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutGraphStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoughnutGraphStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
