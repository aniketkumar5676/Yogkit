import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreapyYogaComponent } from './threapy-yoga.component';

describe('ThreapyYogaComponent', () => {
  let component: ThreapyYogaComponent;
  let fixture: ComponentFixture<ThreapyYogaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreapyYogaComponent]
    });
    fixture = TestBed.createComponent(ThreapyYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
