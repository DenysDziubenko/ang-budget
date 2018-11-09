import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {ButtonModule, CardModule, DataListModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/chart';
import {SummaryComponent} from './summary.component';

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    DataListModule,
    ButtonModule,
    SharedModule
  ],
  providers: []
})
export class SummaryModule {}
