import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestIndvComponent } from './request-indv.component';

describe('RequestIndvComponent', () => {
  let component: RequestIndvComponent;
  let fixture: ComponentFixture<RequestIndvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestIndvComponent]
    });
    fixture = TestBed.createComponent(RequestIndvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
