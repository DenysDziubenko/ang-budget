import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MonthlyItemsComponent} from './monthly-items.component';
import {MonthlyItemsTableComponent} from './tables/monthly-items-table.component';
import {ButtonModule, CardModule, InputTextareaModule, InputTextModule, TooltipModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MonthlyItemsComponent,
    MonthlyItemsTableComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    TableModule,
    ButtonModule,
    InputTextareaModule,
    DialogModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: MonthlyItemsComponent}])
  ],
  providers: []
})
export class MonthlyItemsModule {}
