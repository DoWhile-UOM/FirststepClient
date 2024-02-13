import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminRegistrtionFormComponent } from './company-admin-registrtion-form.component';

describe('CompanyAdminRegistrtionFormComponent', () => {
  let component: CompanyAdminRegistrtionFormComponent;
  let fixture: ComponentFixture<CompanyAdminRegistrtionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAdminRegistrtionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAdminRegistrtionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
