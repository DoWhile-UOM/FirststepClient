import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaNavBarComponent } from './sa-nav-bar.component';

describe('SaNavBarComponent', () => {
  let component: SaNavBarComponent;
  let fixture: ComponentFixture<SaNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
