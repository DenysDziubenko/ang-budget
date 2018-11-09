import { Component } from '@angular/core';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-page-not-found',
  template:`<p-messages [(value)]="msgs"></p-messages>`,
  styles: [`
        :host::ng-deep .ui-messages {
          left: 25%;
          width: 50%;
        }
    `]
})
export class PageNotFoundComponent {

  msgs: Message[] = [{severity:'warn', summary:'Error Message', detail:'Page not found'}];

  constructor() { }

}
