import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequsetComponent } from './requset.component';

describe('RequsetComponent', () => {
  let component: RequsetComponent;
  let fixture: ComponentFixture<RequsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
