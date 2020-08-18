import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowYourPlanComponent } from './show-your-plan.component';

describe('ShowYourPlanComponent', () => {
  let component: ShowYourPlanComponent;
  let fixture: ComponentFixture<ShowYourPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowYourPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowYourPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
