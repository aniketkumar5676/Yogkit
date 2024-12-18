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

  ngOnInit(): void {

  }

  navigate(route: string) {
    this.router.navigate([route],{skipLocationChange:environment.skipURI});
  }
}
