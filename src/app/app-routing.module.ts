import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from "./summary/summary.component";
import {MonthlyItemResolver} from "./services/monthly-item-resolver";

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent, resolve: {monthlyItems: MonthlyItemResolver} },
  { path: 'monthly-items', loadChildren: './monthly-items/monthly-items.module#MonthlyItemsModule' },
  { path: 'not-found', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule'},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers:[ MonthlyItemResolver ]
})
export class AppRoutingModule { }
