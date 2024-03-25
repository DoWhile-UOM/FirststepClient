import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicationListComponent } from './company-application-list.component';

describe('CompanyApplicationListComponent', () => {
  let component: CompanyApplicationListComponent;
  let fixture: ComponentFixture<CompanyApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyApplicationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
