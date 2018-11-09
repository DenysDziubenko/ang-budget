import {Component, Input} from '@angular/core';
import {ErrorInterface} from '../shared/interfaces/error.interface';

@Component({
  selector: 'app-error-dialog',
  template:
      `<p-dialog header="{{error.title}}" [(visible)]="error.display" [modal]="true" [responsive]="true"
              [width]="350" [minWidth]="200" [minY]="70">
      <span>{{error.message}}</span>
      <p-footer>
        <button type="button" pButton icon="fa-check" (click)="error.display=false" label="Ok"></button>
      </p-footer>
    </p-dialog>`
})
export class ErrorDialogComponent {
  @Input() error: ErrorInterface;
}
