import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ICar } from "./car.model";

@Injectable({ providedIn: 'root'})
export class carState {
    cars$ = new BehaviorSubject<any[]>([]);

    setCars(cars: any[]): void {
        this.cars$.next(cars);
    }

    getCars(): Observable<any[]> {
        return this.cars$.asObservable();
    }
}