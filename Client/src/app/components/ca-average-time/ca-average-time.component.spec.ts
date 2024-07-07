import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaAverageTimeComponent } from './ca-average-time.component';

describe('CaAverageTimeComponent', () => {
  let component: CaAverageTimeComponent;
  let fixture: ComponentFixture<CaAverageTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaAverageTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaAverageTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
