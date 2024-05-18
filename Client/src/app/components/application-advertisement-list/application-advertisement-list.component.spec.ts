import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAdvertisementListComponent } from './application-advertisement-list.component';

describe('ApplicationAdvertisementListComponent', () => {
  let component: ApplicationAdvertisementListComponent;
  let fixture: ComponentFixture<ApplicationAdvertisementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationAdvertisementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationAdvertisementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
