import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentouserComponent } from './addpaymentouser.component';

describe('AddpaymentouserComponent', () => {
  let component: AddpaymentouserComponent;
  let fixture: ComponentFixture<AddpaymentouserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentouserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpaymentouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
