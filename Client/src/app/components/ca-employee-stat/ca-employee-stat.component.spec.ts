import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaEmployeeStatComponent } from './ca-employee-stat.component';

describe('CaEmployeeStatComponent', () => {
  let component: CaEmployeeStatComponent;
  let fixture: ComponentFixture<CaEmployeeStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaEmployeeStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaEmployeeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
