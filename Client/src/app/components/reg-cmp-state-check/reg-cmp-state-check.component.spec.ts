import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCmpStateCheckComponent } from './reg-cmp-state-check.component';

describe('RegCmpStateCheckComponent', () => {
  let component: RegCmpStateCheckComponent;
  let fixture: ComponentFixture<RegCmpStateCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegCmpStateCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegCmpStateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
