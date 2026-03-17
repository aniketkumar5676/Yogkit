import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSchedulerComponent } from './youtube-scheduler.component';

describe('YoutubeSchedulerComponent', () => {
  let component: YoutubeSchedulerComponent;
  let fixture: ComponentFixture<YoutubeSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeSchedulerComponent]
    });
    fixture = TestBed.createComponent(YoutubeSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
