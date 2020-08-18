import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupsForEmployeeComponent } from './show-groups-for-employee.component';

describe('ShowGroupsForEmployeeComponent', () => {
  let component: ShowGroupsForEmployeeComponent;
  let fixture: ComponentFixture<ShowGroupsForEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGroupsForEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGroupsForEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
