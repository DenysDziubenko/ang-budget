import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-container" [style.visibility]="display ? 'visible' : 'hidden'"  ><p-progressSpinner></p-progressSpinner></div>`,
  styles: [`
    :host::ng-deep .ui-progress-spinner {
      top: 40%;
    }
    .spinner-container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9000;
      width: 100%;
      height: 100%;
      background-color: gray;
      opacity: 0.7;
    }`],
})
export class SpinnerComponent {
  @Input() display: boolean;
}
