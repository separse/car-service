import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { carState } from '../crar.state';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  firstStep = true;

  form1 = this.formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    car_type: ['', Validators.required],
    fuel: ['', Validators.required],
    year: ['', Validators.required],
    shift: ['', Validators.required],
    color: ['', Validators.required],
    km: ['', Validators.required],
    e_car: [false, Validators.required],
  });

  form2 = this.formBuilder.group({
    damages: this.formBuilder.array([]) ,
  });

  constructor(
    private formBuilder: FormBuilder, 
    private carState: carState, 
    private carService: CarService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  damages(): FormArray {
    return this.form2.get("damages") as FormArray;
  }

  newDamage(): FormGroup {
    return this.formBuilder.group({
      piece: '',
      price: '',
    });
  }

  addDamage(): void {
    this.damages().push(this.newDamage());
  }
   
  removeDamage(i: number): void {
    this.damages().removeAt(i);
  }
   
  submit(): void {
    if(this.form2.valid) {
      const newCar = Object.assign(this.form1.value, this.form2.value);
      this.carService.cars.push(newCar);
      this.carState.setCars(this.carService.cars);
      this.router.navigateByUrl("/dashboard");
    }
  }

  nextStep(): void {
    if(this.form1.valid) {
      this.firstStep = false;
    }
  }

}
