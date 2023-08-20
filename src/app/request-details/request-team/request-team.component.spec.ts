import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTeamComponent } from './request-team.component';

describe('RequestTeamComponent', () => {
  let component: RequestTeamComponent;
  let fixture: ComponentFixture<RequestTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTeamComponent]
    });
    fixture = TestBed.createComponent(RequestTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
