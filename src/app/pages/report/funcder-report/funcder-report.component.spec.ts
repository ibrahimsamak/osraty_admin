import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncderReportComponent } from './funcder-report.component';

describe('FuncderReportComponent', () => {
  let component: FuncderReportComponent;
  let fixture: ComponentFixture<FuncderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
