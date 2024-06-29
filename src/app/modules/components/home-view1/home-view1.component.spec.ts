import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeView1Component } from './home-view1.component';

describe('HomeView1Component', () => {
  let component: HomeView1Component;
  let fixture: ComponentFixture<HomeView1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeView1Component]
    });
    fixture = TestBed.createComponent(HomeView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
