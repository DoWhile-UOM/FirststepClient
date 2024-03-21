import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminPortalComponent } from './company-admin-portal.component';

describe('CompanyAdminPortalComponent', () => {
  let component: CompanyAdminPortalComponent;
  let fixture: ComponentFixture<CompanyAdminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAdminPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
