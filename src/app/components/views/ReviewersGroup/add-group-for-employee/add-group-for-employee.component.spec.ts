import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupForEmployeeComponent } from './add-group-for-employee.component';

describe('AddGroupForEmployeeComponent', () => {
  let component: AddGroupForEmployeeComponent;
  let fixture: ComponentFixture<AddGroupForEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupForEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupForEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
