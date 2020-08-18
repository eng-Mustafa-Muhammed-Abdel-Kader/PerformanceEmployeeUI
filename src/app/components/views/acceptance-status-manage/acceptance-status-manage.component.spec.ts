import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceStatusManageComponent } from './acceptance-status-manage.component';

describe('AcceptanceStatusManageComponent', () => {
  let component: AcceptanceStatusManageComponent;
  let fixture: ComponentFixture<AcceptanceStatusManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceStatusManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceStatusManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
