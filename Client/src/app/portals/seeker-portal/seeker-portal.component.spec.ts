import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerPortalComponent } from './seeker-portal.component';

describe('SeekerPortalComponent', () => {
  let component: SeekerPortalComponent;
  let fixture: ComponentFixture<SeekerPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
