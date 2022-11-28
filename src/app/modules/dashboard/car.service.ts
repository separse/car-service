import { Injectable } from '@angular/core';
import { ICar } from './car.model';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  cars: any = [
    {
      brand: 'BMW', 
      model: '5.0', 
      km: '100', 
      year: '2018',
      shift: 'automatic', 
      fuel: 'benzin', 
      color: 'black', 
      car_type: 'sedan',
      e_car: false
    }, 
    {
      brand: 'Mercedes', 
      model: 'AMG',
      km: '0',
      year: '2019',
      shift: 'automatic', 
      fuel: 'benzin', 
      color: 'white', 
      car_type: 'sedan',
      e_car: false
    },
  ];

}
