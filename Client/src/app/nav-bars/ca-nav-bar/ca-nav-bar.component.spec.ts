import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaNavBarComponent } from './ca-nav-bar.component';

describe('CaNavBarComponent', () => {
  let component: CaNavBarComponent;
  let fixture: ComponentFixture<CaNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
