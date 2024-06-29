import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-slider-menter',
  templateUrl: './slider-menter.component.html',
  styleUrls: ['./slider-menter.component.scss']
})
export class SliderMenterComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(private router:Router){

  }

  navigate(){
   this.router.navigate(['mentors'],{skipLocationChange:environment.skipURI})
  }

}
