import {TYPE} from '../enums/monthly-item-type.enum';
import {MonthlyItem} from './monthlyItem.interface';

export class MonthlyTableOptions {
  caption: string;
  addBtnLabel: string;
  type: TYPE;
  monthlyItems: MonthlyItem[];
  getTotal: () => number;
}


