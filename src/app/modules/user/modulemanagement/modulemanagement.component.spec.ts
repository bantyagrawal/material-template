import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulemanagementComponent } from './modulemanagement.component';

describe('ModulemanagementComponent', () => {
  let component: ModulemanagementComponent;
  let fixture: ComponentFixture<ModulemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulemanagementComponent]
    });
    fixture = TestBed.createComponent(ModulemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
