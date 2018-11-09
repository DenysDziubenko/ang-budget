import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';
import {MonthlyItem} from '../shared/interfaces/monthlyItem.interface';
import {Injectable} from '@angular/core';
import {MonthlyItemService} from './monthly-item.service';

@Injectable()
export class ServiceHelper {
  private rangeDatesChange: Subject<Array<Date>> = new Subject();
  private monthlyItemsChange: Subject<Observable<MonthlyItem[]>> = new Subject();
  private rangeDates: Array<Date> = [];
  private errorOccursChange: Subject<any> = new Subject();
  private spinnerOccursChange: Subject<boolean> = new Subject();

  constructor(private mis: MonthlyItemService) {
    this.setCurrentMonthRange();
  }

  private setCurrentMonthRange() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    this.rangeDates.push(new Date(y, m, 1));
    this.rangeDates.push(new Date(y, m + 1, 0));
  }

  public setRangeDates(rangeDates: Array<Date>){
    this.rangeDates = rangeDates;
    this.rangeDatesChange.next(this.rangeDates.slice());
    this.monthlyItemsChange.next(this.mis.getMonthlyItems(this.getRangeDates()));
  }

  public getRangeDates(): Array<Date>{
    return this.rangeDates.slice();
  }

  public getRangeDatesChangeEmitter(): Subject<Array<Date>> {
    return this.rangeDatesChange;
  }

  public geMonthlyItemsChangeEmitter(): Subject<Observable<MonthlyItem[]>> {
    return this.monthlyItemsChange;
  }

  static logout(): void {
    localStorage.clear();
  }

  static isLoggedIn(): Boolean {
    return localStorage.getItem('token') !== null;
  }

  static getUserName(): String {
    const userName = localStorage.getItem('userName');
    return userName ? userName : '';
  }

  public getErrorOccursChangeEmitter(): Subject<any> {
    return this.errorOccursChange;
  }

  public getSpinnerOccursChangeEmitter(): Subject<boolean> {
    return this.spinnerOccursChange;
  }

}
