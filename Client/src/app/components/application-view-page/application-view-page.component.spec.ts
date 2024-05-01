import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewPageComponent } from './application-view-page.component';

describe('ApplicationViewPageComponent', () => {
  let component: ApplicationViewPageComponent;
  let fixture: ComponentFixture<ApplicationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
