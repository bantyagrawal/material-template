import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelmanagementComponent } from './levelmanagement.component';

describe('LevelmanagementComponent', () => {
  let component: LevelmanagementComponent;
  let fixture: ComponentFixture<LevelmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelmanagementComponent]
    });
    fixture = TestBed.createComponent(LevelmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
