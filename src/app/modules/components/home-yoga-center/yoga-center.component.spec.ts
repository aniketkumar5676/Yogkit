import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaCenterComponent } from './yoga-center.component';

describe('YogaCenterComponent', () => {
  let component: YogaCenterComponent;
  let fixture: ComponentFixture<YogaCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YogaCenterComponent]
    });
    fixture = TestBed.createComponent(YogaCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
