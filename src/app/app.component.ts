import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceHelper} from './services/service-helper';
import {ErrorDialogComponent} from './dialogs/errordialog.component';
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs/Subscription";
import {ErrorInterface} from './shared/interfaces/error.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [ErrorDialogComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  private errComponentRef;
  private subscriptions: Subscription[] = [];
  menuItems: MenuItem[];
  title = 'Budget';
  showSpinner = false;
  rangeDates: Array<Date> = [];
  @ViewChild('error', {read: ViewContainerRef}) error;
  constructor(private router: Router,
              private sh: ServiceHelper,
              private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.menuItems = [
      {label: 'Summary', routerLink : "summary", icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Monthly Items', routerLink: "monthly-items", icon: 'fa fa-fw fa-book'}
    ];

    this.rangeDates = this.sh.getRangeDates();

    this.subscriptions.push(this.sh.getErrorOccursChangeEmitter().subscribe(
      err => this.showErrorDialog(err))
    );
    this.subscriptions.push(this.sh.getSpinnerOccursChangeEmitter().subscribe(
      show => {
        setTimeout(() => {
          this.showSpinner = show;
        }, 0);
      }));
    this.subscriptions.push(this.sh.getRangeDatesChangeEmitter().subscribe(
      (rangeDates: Array<Date>) => this.rangeDates = rangeDates
    ));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  isLoggedIn() {
    return ServiceHelper.isLoggedIn();
  }

  logout() {
    ServiceHelper.logout();
    return this.router.navigateByUrl('signin');
  }

  getUserName() {
    return ServiceHelper.getUserName();
  }

  onMonthChange() {
    if (this.rangeDates.every(date => !!date)) {
      this.sh.setRangeDates(this.rangeDates.slice());
    }
  }

  showErrorDialog(err) {
    const {title, error} = err.error;
    const errorInt: ErrorInterface = {
      title: title || 'Error',
      message: error.message || 'Something went wrong!',
      display: true

    };

    if (!this.errComponentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ErrorDialogComponent);
      this.errComponentRef = this.error.createComponent(factory);
    }

    if (errorInt.title === 'Not Authenticated') {
      this.logout().then(() => {
        this.errComponentRef.instance.error = errorInt;
      });
    } else {
      this.errComponentRef.instance.error = errorInt;
    }
  }

}
