import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasNavBarComponent } from './tas-nav-bar.component';

describe('TasNavBarComponent', () => {
  let component: TasNavBarComponent;
  let fixture: ComponentFixture<TasNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
