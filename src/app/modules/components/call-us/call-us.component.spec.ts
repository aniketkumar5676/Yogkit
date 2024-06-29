import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallUsComponent } from './call-us.component';

describe('CallUsComponent', () => {
  let component: CallUsComponent;
  let fixture: ComponentFixture<CallUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallUsComponent]
    });
    fixture = TestBed.createComponent(CallUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
