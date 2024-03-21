import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRManagerPortalComponent } from './hrmanager-portal.component';

describe('HRManagerPortalComponent', () => {
  let component: HRManagerPortalComponent;
  let fixture: ComponentFixture<HRManagerPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HRManagerPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HRManagerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
