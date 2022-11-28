import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ICar } from '../car.model';
import { CarService } from '../car.service';
import { carState } from '../crar.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cars: any[] = [];
  filteredCars: any[] = [];

  brands: string[] = ['none'];
  models: string[] = ['none'];
  types: string[] = ['none'];
  fuels: string[] = ['none'];
  years: string[] = ['none'];
  shifts: string[] = ['none'];
  colors: string[] = ['none'];
  kms: string[] = ['none'];
  ecars: string[] = ['none', 'true', 'false'];

  filterForm: FormGroup = this.formBuilder.group({
    brand: ['none'],
    model: ['none'],
    type: ['none'],
    fuel: ['none'],
    year: ['none'],
    shift: ['none'],
    color: ['none'],
    km: ['none'],
    ecar: ['none']
  })


  constructor(
    public formBuilder: FormBuilder,
    private carState: carState,
    private carService: CarService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setCars();
    this.getCars();
    this.observeForm();
  }

  setCars(): void {
    this.carState.setCars(this.carService.cars);
  }

  getCars(): void {
    this.carState.getCars().pipe(
      tap(cars => {
        cars.forEach(car => {
          if(!this.brands.includes(car.brand)) this.brands.push(car.brand);
          if(!this.models.includes(car.model)) this.models.push(car.model);
          if(!this.types.includes(car.car_type)) this.types.push(car.car_type);
          if(!this.fuels.includes(car.fuel)) this.fuels.push(car.fuel);
          if(!this.years.includes(car.year)) this.years.push(car.year);
          if(!this.shifts.includes(car.shift)) this.shifts.push(car.shift);
          if(!this.colors.includes(car.color)) this.colors.push(car.color);
          if(!this.kms.includes(car.km)) this.kms.push(car.km);
        })
      }),
    ).subscribe(cars => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  observeForm(): void { 
    this.filterForm.valueChanges.subscribe(v => {
      console.log(v);
      
      this.filteredCars = this.cars;
      // brand 
      if(v.brand !== "none") this.filteredCars = this.filteredCars.filter(car => car.brand == v.brand);
      // model 
      if(v.model !== "none") this.filteredCars = this.filteredCars.filter(car => car.model == v.model);
      // type 
      if(v.type !== "none") this.filteredCars = this.filteredCars.filter(car => car.car_type == v.type);
      // fuel 
      if(v.fuel !== "none") this.filteredCars = this.filteredCars.filter(car => car.fuel == v.fuel);
      // year 
      if(v.year !== "none") this.filteredCars = this.filteredCars.filter(car => car.year == v.year);
      // shift 
      if(v.shift !== "none") this.filteredCars = this.filteredCars.filter(car => car.shift == v.shift);
      // color 
      if(v.color !== "none") this.filteredCars = this.filteredCars.filter(car => car.color == v.color);
      // km 
      if(v.km !== "none") this.filteredCars = this.filteredCars.filter(car => car.km == v.km);
      // e-car 
      if(v.ecar !== "none") this.filteredCars = this.filteredCars.filter(car => v.ecar === 'true' ? car.e_car : !car.e_car);
    });
  }

  addNewCar(): void {
    this.router.navigateByUrl("/dashboard/add-car");
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
