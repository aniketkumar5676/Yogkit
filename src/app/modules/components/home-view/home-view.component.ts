import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit{
  constructor(private router: Router) {}
  targetDate = new Date('2024-06-22T00:00:00');
  currentDate = new Date();

  ngOnInit(): void {
  const timeDifference = this.targetDate.getTime() - this.currentDate.getTime();

  if (timeDifference > 0) {
    document.getElementById("corosel-yoga")?.click();
  }

  }

  navigate(route: string) {
    this.router.navigate([route],{skipLocationChange:environment.skipURI});
  }
}
