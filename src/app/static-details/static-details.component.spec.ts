import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticDetailsComponent } from './static-details.component';

describe('StaticDetailsComponent', () => {
  let component: StaticDetailsComponent;
  let fixture: ComponentFixture<StaticDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
