import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {MonthlyItem} from '../shared/interfaces/monthlyItem.interface';
import {TYPE} from '../shared/enums/monthly-item-type.enum';
import {ServiceHelper} from '../services/service-helper';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit, OnDestroy {
  private rangeDates: Array<Date>;
  private monthlyItems: MonthlyItem[];
  private subscriptions: Subscription[] = [];
  private colors = ['#FF6384', '#36A2EB', '#FFCE56', '#ABCE56'];
  private currentMonthDates: Array<Date> = [];
  private previousMonthDates: Array<Date> = [];
  currentMonthSelected: Boolean;
  previousMonthSelected: Boolean;
  currentMonth: String;
  previousMonth: String;
  summaryItems: Array<any> = [
    {title: 'Total Monthly Income', value: null},
    {title: 'Total Monthly Expenses', value: null},
    {title: 'Total Monthly Savings', value: null},
    {title: 'Cash Balance', value: null},
  ];
  chartData: any;

  constructor( private route: ActivatedRoute, private sh: ServiceHelper) {}

  ngOnInit() {
    this.setCurrentAndPreviousMonthRange();
    this.rangeDates = this.sh.getRangeDates();
    this.setUpButtons();

    this.route.data.subscribe((data: Data) => {
      this.monthlyItems = data['monthlyItems'];
      this.setUpChartAndTable();
    });

    this.subscriptions.push(this.sh.getRangeDatesChangeEmitter().subscribe(
      (rangeDates: Array<Date>) => {
        this.rangeDates = rangeDates;
        this.setUpButtons();
      }
    ));

    this.subscriptions.push(this.sh.geMonthlyItemsChangeEmitter().subscribe(
      (o: Observable<MonthlyItem[]>) => {
        o.subscribe((mi: MonthlyItem[]) => {
          this.monthlyItems = mi;
          this.setUpChartAndTable();
        })
      }
    ));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setCurrentAndPreviousMonthRange() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const months: String[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'];
    this.currentMonthDates.push(new Date(y, m, 1), new Date(y, m + 1, 0));
    this.previousMonthDates.push(new Date(y - (m > 0 ? 0 : 1), (m - 1 + 12) % 12, 1), new Date(y, m, 0));
    this.currentMonth = months[date.getMonth()];
    this.previousMonth =  months[(date.getMonth() - 1 + 12) % 12];
  }

  setUpButtons() {
    const checkDates = (actualDates, monthDates) => {
      return actualDates.every((date, i) => {
        if (!date || !monthDates[i]) {
          return false;
        } else {
          return date.toDateString() === monthDates[i].toDateString();
        }
      });
    };

    this.currentMonthSelected = checkDates(this.rangeDates, this.currentMonthDates);
    this.previousMonthSelected = checkDates(this.rangeDates, this.previousMonthDates);
  }

  onCurrentMonthMonthClick() {
    this.rangeDates = this.currentMonthDates;
    this.setUpButtons();
    this.sh.setRangeDates(this.rangeDates);
  }

  onPreviousMonthClick() {
    this.rangeDates = this.previousMonthDates;
    this.setUpButtons();
    this.sh.setRangeDates(this.rangeDates);
  }

  setUpChartAndTable(): void {
    const getTotAmountItemsByType = (type, monItems) => {
      return monItems.filter(monthlyItem => {
        return monthlyItem.type === type;
      }).reduce((sum, currentMonthlyItem) => {
        return sum + currentMonthlyItem.amount;
      }, 0);
    };

    const income = getTotAmountItemsByType(TYPE.INCOME, this.monthlyItems);
    const expense = getTotAmountItemsByType(TYPE.EXPENSE, this.monthlyItems);
    const saving = getTotAmountItemsByType(TYPE.SAVING, this.monthlyItems);
    const cashBalance = income - (expense + saving);
    this.summaryItems.find(e => e.title === 'Total Monthly Income').value = income;
    this.summaryItems.find(e => e.title === 'Total Monthly Expenses').value = expense;
    this.summaryItems.find(e => e.title === 'Total Monthly Savings').value = saving;
    this.summaryItems.find(e => e.title === 'Cash Balance').value = cashBalance;
    this.chartData = {
      labels: this.summaryItems.map(item => item.title),
      datasets: [
        {
          data: this.summaryItems.map(item => item.value),
          backgroundColor: this.colors,
          hoverBackgroundColor: this.colors
        }]
    };
  }
}
