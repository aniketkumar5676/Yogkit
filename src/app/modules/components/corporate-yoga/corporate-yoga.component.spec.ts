import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateYogaComponent } from './corporate-yoga.component';

describe('CorporateYogaComponent', () => {
  let component: CorporateYogaComponent;
  let fixture: ComponentFixture<CorporateYogaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateYogaComponent]
    });
    fixture = TestBed.createComponent(CorporateYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
