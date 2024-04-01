import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicationComponent } from './company-application.component';

describe('CompanyApplicationComponent', () => {
  let component: CompanyApplicationComponent;
  let fixture: ComponentFixture<CompanyApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
