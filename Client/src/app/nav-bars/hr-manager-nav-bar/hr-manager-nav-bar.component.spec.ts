import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrManagerNavBarComponent } from './hr-manager-nav-bar.component';

describe('HrManagerNavBarComponent', () => {
  let component: HrManagerNavBarComponent;
  let fixture: ComponentFixture<HrManagerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrManagerNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrManagerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
