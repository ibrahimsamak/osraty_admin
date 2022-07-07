import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFileComponent } from './bank-file.component';

describe('BankFileComponent', () => {
  let component: BankFileComponent;
  let fixture: ComponentFixture<BankFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
