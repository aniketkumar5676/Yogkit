import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from 'src/environment/environment'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(
    private route: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
   
  }

  navigate(arg0: string) {
    this.route.navigate([arg0],{skipLocationChange:environment.skipURI})
  }

  // Close mobile menu after navigation
  closeMobileMenu() {
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Remove the 'show' class to collapse the menu
      this.renderer.removeClass(navbarCollapse, 'show');
      
      // Also close any open dropdowns
      const dropdowns = this.elementRef.nativeElement.querySelectorAll('.dropdown-menu.show');
      dropdowns.forEach((dropdown: any) => {
        this.renderer.removeClass(dropdown, 'show');
      });
      
      // Update the navbar toggler button state
      const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
      if (navbarToggler) {
        this.renderer.setAttribute(navbarToggler, 'aria-expanded', 'false');
      }
    }
  }

  // Handle navigation with menu closing
  navigateAndCloseMenu(route: string) {
    this.navigate(route);
    this.closeMobileMenu();
  }
}
