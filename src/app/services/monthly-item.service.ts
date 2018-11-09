import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MonthlyItem} from '../shared/interfaces/monthlyItem.interface';
import {URL} from '../shared/enums/url.enum';

@Injectable()
export class MonthlyItemService {

  constructor(private hc: HttpClient){}

  /** GET monthlyItems from the server. */
  getMonthlyItems (rangeDates?: Array<Date>): Observable<MonthlyItem[]> {
    return this.hc.get<MonthlyItem[]>(URL.MONTHLYITEMS, {
      headers: rangeDates ? new HttpHeaders().set('startdatetime', `${rangeDates[0].toISOString()}`).set('enddatetime', `${rangeDates[1].toISOString()}`) : null
    })
  }

  /** PUT: update the monthlyItem. */
  updateMonthlyItem (monthlyItem: MonthlyItem): Observable<MonthlyItem> {
    return this.hc.put<MonthlyItem>(URL.MONTHLYITEMS, monthlyItem);
  }

  /** POST: add a new monthlyItem. */
  addMonthlyItem (monthlyItem: MonthlyItem): Observable<MonthlyItem> {
    return this.hc.post<MonthlyItem>(URL.MONTHLYITEMS, monthlyItem);
  }

  /** DELETE: delete the monthlyItem. */
  deleteMonthlyItem (monthlyItem: MonthlyItem | number): Observable<any> {
    const id = typeof monthlyItem === 'number' ? monthlyItem : monthlyItem._id;
    return this.hc.delete<any>(`${URL.MONTHLYITEMS.toString()}/${id}`)
  }
}

