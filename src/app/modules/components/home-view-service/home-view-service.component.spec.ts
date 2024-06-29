import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewServiceComponent } from './home-view-service.component';

describe('HomeViewServiceComponent', () => {
  let component: HomeViewServiceComponent;
  let fixture: ComponentFixture<HomeViewServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewServiceComponent]
    });
    fixture = TestBed.createComponent(HomeViewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
