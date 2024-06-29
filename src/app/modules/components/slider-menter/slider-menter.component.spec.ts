import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMenterComponent } from './slider-menter.component';

describe('SliderMenterComponent', () => {
  let component: SliderMenterComponent;
  let fixture: ComponentFixture<SliderMenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderMenterComponent]
    });
    fixture = TestBed.createComponent(SliderMenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
