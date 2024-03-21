import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRAssistantPortalComponent } from './hrassistant-portal.component';

describe('HRAssistantPortalComponent', () => {
  let component: HRAssistantPortalComponent;
  let fixture: ComponentFixture<HRAssistantPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HRAssistantPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HRAssistantPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
