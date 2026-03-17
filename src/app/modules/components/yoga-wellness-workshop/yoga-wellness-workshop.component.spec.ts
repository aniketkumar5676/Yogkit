import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaWellnessWorkshopComponent } from './yoga-wellness-workshop.component';

describe('YogaWellnessWorkshopComponent', () => {
  let component: YogaWellnessWorkshopComponent;
  let fixture: ComponentFixture<YogaWellnessWorkshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YogaWellnessWorkshopComponent]
    });
    fixture = TestBed.createComponent(YogaWellnessWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
