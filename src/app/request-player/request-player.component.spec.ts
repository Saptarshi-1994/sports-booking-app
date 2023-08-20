import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPlayerComponent } from './request-player.component';

describe('RequestPlayerComponent', () => {
  let component: RequestPlayerComponent;
  let fixture: ComponentFixture<RequestPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestPlayerComponent]
    });
    fixture = TestBed.createComponent(RequestPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
