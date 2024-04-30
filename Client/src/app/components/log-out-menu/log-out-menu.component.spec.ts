import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutMenuComponent } from './log-out-menu.component';

describe('LogOutMenuComponent', () => {
  let component: LogOutMenuComponent;
  let fixture: ComponentFixture<LogOutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOutMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogOutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
