import {Component, Input} from '@angular/core';
import {MonthlyTableOptions} from '../../shared/interfaces/monthlyTableOptions.interface';
import {MonthlyItem} from '../../shared/interfaces/monthlyItem.interface';
import {MonthlyItemService} from '../../services/monthly-item.service';


@Component({
  selector: 'app-monthly-items-table',
  templateUrl: './monthly-items-table.component.html'
})
export class MonthlyItemsTableComponent {
  @Input() tableOptions: MonthlyTableOptions;
  displayMonthlyItemDialog: boolean;
  monthlyItem: MonthlyItem;
  selectedMonthlyItem: MonthlyItem;
  newMonthlyItem: boolean;
  cols: any[] = [
    { field: 'name', header: 'ITEM' },
    { field: 'dueDate', header: 'DUE DATE' },
    { field: 'amount', header: 'AMOUNT' },
    { field: 'description', header: 'DESCRIPTION' }];
  emptymessage: string = 'No records found';

  constructor(private monthlyItemService: MonthlyItemService) {}

  showDialogToAdd() {
    this.newMonthlyItem = true;
    this.monthlyItem = {
      _id: undefined ,
      name: '',
      dueDate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      amount: undefined,
      type: this.tableOptions.type,
      description: ''};
    this.displayMonthlyItemDialog = true;
  }

  save() {
    const monthlyItems = [...this.tableOptions.monthlyItems];
    const callback = () => {
      this.monthlyItem = null;
      this.displayMonthlyItemDialog = false;
    };
    if (this.newMonthlyItem) {
      this.monthlyItemService.addMonthlyItem(this.monthlyItem)
        .subscribe(monthlyItem => {
          monthlyItems.push(monthlyItem);
          this.tableOptions.monthlyItems = monthlyItems;
          callback();
        });
    }else {
      this.monthlyItemService.updateMonthlyItem(this.monthlyItem)
        .subscribe(monthlyItem => {
          monthlyItems[this.tableOptions.monthlyItems.indexOf(this.selectedMonthlyItem)] = monthlyItem;
          this.tableOptions.monthlyItems = monthlyItems;
          callback();
        });
    }
  }

  delete() {
    const monthlyItem = this.selectedMonthlyItem;
    const index = this.tableOptions.monthlyItems.indexOf(monthlyItem);
    this.tableOptions.monthlyItems = this.tableOptions.monthlyItems.filter((val, i) => i !== index);
    this.monthlyItemService.deleteMonthlyItem(monthlyItem).subscribe(() => {
      this.monthlyItem = null;
      this.displayMonthlyItemDialog = false;
    });
  }

  onRowSelect(event) {
    this.newMonthlyItem = false;
    this.monthlyItem = Object.assign({}, event.data);
    this.displayMonthlyItemDialog = true;
  }

}
