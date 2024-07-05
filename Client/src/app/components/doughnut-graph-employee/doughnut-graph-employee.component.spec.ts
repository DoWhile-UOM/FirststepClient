import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutGraphEmployeeComponent } from './doughnut-graph-employee.component';

describe('DoughnutGraphEmployeeComponent', () => {
  let component: DoughnutGraphEmployeeComponent;
  let fixture: ComponentFixture<DoughnutGraphEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutGraphEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoughnutGraphEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
