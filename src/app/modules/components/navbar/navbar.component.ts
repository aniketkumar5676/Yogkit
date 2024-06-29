import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from 'src/environment/environment'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(private route:Router){ }


  ngOnInit(): void {
   
  }


  
navigate(arg0: string) {
this.route.navigate([arg0],{skipLocationChange:environment.skipURI})
}

}
