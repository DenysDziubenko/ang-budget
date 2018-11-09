import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MonthlyItemService} from "./monthly-item.service";
import {MonthlyItem} from '../shared/interfaces/monthlyItem.interface';
import {ServiceHelper} from './service-helper';


@Injectable()
export class MonthlyItemResolver implements Resolve<MonthlyItem[]> {
  constructor(private mis: MonthlyItemService, private sh: ServiceHelper) {}

  resolve(): Observable<MonthlyItem[]> | Promise<MonthlyItem[]> | MonthlyItem[] {
    return this.mis.getMonthlyItems(this.sh.getRangeDates());
  }
}
