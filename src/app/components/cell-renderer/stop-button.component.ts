import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconAction } from './actions.component';

@Component({
  selector: 'app-stop-button.renderer.ts',
  standalone: true,
  imports: [MatIconModule],
  template: `<mat-icon fontSet="material-icons-outlined" (click)="_action()">stop</mat-icon>`,
})
export class StopButtonRendererComponent {
  public action = input<IconAction>();
  public params = input.required<any>();

  protected _action() {
    let actionCb = this.action();
    if (actionCb) {
      actionCb(this.params());
    }
  }
}
