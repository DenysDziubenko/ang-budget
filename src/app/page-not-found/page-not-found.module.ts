import {PageNotFoundComponent} from './page-not-found.component';
import {MessagesModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MessagesModule,
    RouterModule.forChild([{path: '', component: PageNotFoundComponent}])
  ],
  providers: []
})
export class PageNotFoundModule {}
