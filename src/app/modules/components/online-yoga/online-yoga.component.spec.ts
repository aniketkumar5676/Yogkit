import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineYogaComponent } from './online-yoga.component';

describe('OnlineYogaComponent', () => {
  let component: OnlineYogaComponent;
  let fixture: ComponentFixture<OnlineYogaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineYogaComponent]
    });
    fixture = TestBed.createComponent(OnlineYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
