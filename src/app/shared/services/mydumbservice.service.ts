import { Injectable } from '@angular/core';
import { catchError, throwError, of, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MydumbserviceService {
  readonly exposedVariable: string = '';
  private _internalValue: number = 42;
  // Create a subject
  private mySubject = new Subject<number>();
   mySubject2 = new BehaviorSubject<number>(0);
  readonly mySubject$ = this.mySubject.asObservable();
  replaySubject = new ReplaySubject(3);

  get publicValue(): any {
    return this._internalValue;
  }

  private set setPublicValue(val: number) {
    this._internalValue = val;
  }

  constructor() {
    // this.fetchData().pipe(
    //   catchError(err => {
    //     console.error("An error occurred: ", err);
    //     return of("Fallback data"); // providing fallback data
    //   })
    // ).subscribe(data => {
    //   console.log("received data: ", data)
    // })
    console.log('Hello From myDumbService');
    this.fetchData();
  }

  fetchData = () => {
    let count1 = 1;
    let count2 = 1;
    // setInterval(() => {
     
    // }, 1000);
     while (count1 <= 15) {
        this.mySubject.next(count1++);
        count1++;
      }
    while (count2 <= 30) {
      this.mySubject2.next((count2));
      count2 *= 2;
    }

    this.replaySubject.next(4);
    this.replaySubject.next(5);
    this.replaySubject.next(6);
    this.replaySubject.next(7);
    this.replaySubject.next(8);
    this.mySubject2.complete();

  };
}
