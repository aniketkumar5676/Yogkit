import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaRetreatComponent } from './yoga-retreat.component';

describe('YogaRetreatComponent', () => {
  let component: YogaRetreatComponent;
  let fixture: ComponentFixture<YogaRetreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaRetreatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YogaRetreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
