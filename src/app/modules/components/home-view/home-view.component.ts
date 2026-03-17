import { Component, OnInit, AfterViewInit } from '@angular/core';

// Import the config file directly
import configData from '../../../../schedule-config.json';

declare var bootstrap: any;

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit, AfterViewInit {

  // Configuration data
  config: any = configData;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap carousel after view is ready
    setTimeout(() => {
      const carouselElement = document.querySelector('#heroCarousel');
      if (carouselElement) {
        // Destroy existing carousel instance if it exists
        try {
          const existingCarousel = (window as any).bootstrap?.Carousel?.getInstance(carouselElement);
          if (existingCarousel) {
            existingCarousel.dispose();
          }
        } catch (e) {
          console.log('No existing carousel to dispose');
        }

        // Check if Bootstrap is available
        if (typeof (window as any).bootstrap !== 'undefined') {
          try {
            const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
              interval: 2000,
              ride: 'carousel',
              wrap: true,
              keyboard: true,
              pause: 'hover'
            });

            // Explicitly start the carousel cycle
            carousel.cycle();

            // Ensure carousel cycles properly
            carouselElement.addEventListener('slide.bs.carousel', function (event: any) {
              // Carousel is sliding
            });
          } catch (e) {
            console.error('Error initializing carousel:', e);
          }
        } else if (typeof bootstrap !== 'undefined') {
          try {
            const carousel = new bootstrap.Carousel(carouselElement, {
              interval: 5000,
              ride: 'carousel',
              wrap: true,
              keyboard: true,
              pause: 'hover'
            });
            carousel.cycle();
          } catch (e) {
            console.error('Error initializing carousel:', e);
          }
        }
      }
    }, 300);
  }
}
