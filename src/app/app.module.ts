import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TabMenuModule, CalendarModule} from 'primeng/primeng';
import {MonthlyItemService} from './services/monthly-item.service';
import {ServiceHelper} from './services/service-helper';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {SummaryModule} from './summary/summary.module';
import {DialogsModule} from './dialogs/dialogs.module';
import {FormsModule} from '@angular/forms';
import {RequestInterceptor} from './services/request-interceptor';
import {SpinnerComponent} from './spinner/spinner.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    TabMenuModule,
    FormsModule,
    AuthModule,
    SummaryModule,
    DialogsModule,
    ProgressSpinnerModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    MonthlyItemService,
    ServiceHelper,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
