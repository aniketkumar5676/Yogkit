import { Component, OnInit } from '@angular/core';

// Import the config file directly
import configData from '../../../../schedule-config.json';

@Component({
  selector: 'app-yoga-with-prince',
  templateUrl: './yoga-with-prince.component.html',
  styleUrls: ['./yoga-with-prince.component.scss']
})
export class YogaWithPrinceComponent implements OnInit {

  // Configuration data
  config: any = configData;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
