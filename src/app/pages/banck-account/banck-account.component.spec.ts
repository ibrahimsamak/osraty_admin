import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanckAccountComponent } from './banck-account.component';

describe('BanckAccountComponent', () => {
  let component: BanckAccountComponent;
  let fixture: ComponentFixture<BanckAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanckAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanckAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
