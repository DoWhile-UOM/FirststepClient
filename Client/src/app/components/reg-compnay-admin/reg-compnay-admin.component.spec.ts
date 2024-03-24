import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCompnayAdminComponent } from './reg-compnay-admin.component';

describe('RegCompnayAdminComponent', () => {
  let component: RegCompnayAdminComponent;
  let fixture: ComponentFixture<RegCompnayAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegCompnayAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegCompnayAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
