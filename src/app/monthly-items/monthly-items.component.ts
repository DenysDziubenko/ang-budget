import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MonthlyItemService} from "../services/monthly-item.service";
import {Subscription} from "rxjs/Subscription";
import {MonthlyItem} from '../shared/interfaces/monthlyItem.interface';
import {MonthlyTableOptions} from '../shared/interfaces/monthlyTableOptions.interface';
import {TYPE} from '../shared/enums/monthly-item-type.enum';
import {MonthlyItemsTableComponent} from './tables/monthly-items-table.component';
import {ServiceHelper} from '../services/service-helper';

@Component({
  selector: 'app-monthly-items',
  templateUrl: './monthly-items.component.html',
  entryComponents: [MonthlyItemsTableComponent]
})
export class MonthlyItemsComponent implements OnInit, OnDestroy {
  private monthlyItems: MonthlyItem[];
  private subscriptions: Subscription[] = [];
  private _tableRefs = [];
  private tablesOptions: MonthlyTableOptions[] = [
    {
      caption: 'Monthly Income',
      addBtnLabel: 'Add income item',
      type: TYPE.INCOME,
      monthlyItems: null,
      getTotal: () => 0
    },
    {
      caption: 'Monthly Savings',
      addBtnLabel: 'Add saving item',
      type: TYPE.SAVING,
      monthlyItems: null,
      getTotal: () => 0
    },
    {
      caption: 'Monthly Expenses',
      addBtnLabel: 'Add expense item',
      type: TYPE.EXPENSE,
      monthlyItems: null,
      getTotal: () => 0
    }
  ];
  @ViewChild('monthlyIncomesTable', {read: ViewContainerRef}) monthlyIncomesTable;
  @ViewChild('monthlySavingsTable', {read: ViewContainerRef}) monthlySavingsTable;
  @ViewChild('monthlyExpensesTable', {read: ViewContainerRef}) monthlyExpensesTable;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private monthlyItemService: MonthlyItemService,
              private sh: ServiceHelper) {}

  ngOnInit() {
    this.setUpTables();

    this.monthlyItemService.getMonthlyItems(this.sh.getRangeDates()).subscribe(
      (monthlyItems :MonthlyItem[]) => {
        this.monthlyItems = monthlyItems;
        this.updateTables();
      }
    );

    this.subscriptions.push(this.sh.geMonthlyItemsChangeEmitter().subscribe(
      (o: Observable<MonthlyItem[]>) => {
        o.subscribe((mi: MonthlyItem[]) => {
          this.monthlyItems = mi;
          this.updateTables();
        })
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setUpTables(){
    const factory = this._componentFactoryResolver.resolveComponentFactory(MonthlyItemsTableComponent);
    [this.monthlyIncomesTable, this.monthlySavingsTable,  this.monthlyExpensesTable].forEach((table, i) => {
      this._tableRefs.push(table.createComponent(factory));
      const ins = this._tableRefs[i].instance;
      ins.tableOptions = this.tablesOptions[i];
    });
  }


  updateTables() {
    const filter = type => {
      return monthlyItem => {
        return monthlyItem.type === type;
      };
    };

    this.tablesOptions.forEach(tablesOption => {
      const type = tablesOption.type;
      if ( type === TYPE.INCOME) {
        tablesOption.monthlyItems = this.monthlyItems.filter(filter(type));
      } else if ( type === TYPE.SAVING) {
        tablesOption.monthlyItems = this.monthlyItems.filter(filter(type));
      } else {
        tablesOption.monthlyItems = this.monthlyItems.filter(filter(type));
      }

      tablesOption.getTotal = (): number => {
        if (!tablesOption.monthlyItems) {
          return 0;
        }
        return tablesOption.monthlyItems
          .map(item => item.amount)
          .reduce((sum, current) => sum + current, 0);
      };
    });
  }
}
