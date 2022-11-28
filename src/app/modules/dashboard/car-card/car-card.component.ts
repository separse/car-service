import { Component, Input, OnInit } from '@angular/core';
import { ICar } from '../car.model';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {
  @Input() car!: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.car);
    
  }

}
