import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconAction } from './actions.component';

@Component({
  standalone: true,
  imports: [MatIconModule],
  template: `<mat-icon fontSet="material-icons-outlined" (click)="_action()">visibility</mat-icon>`,
})
export class ViewButtonRendererComponent {
  public action = input<IconAction>();
  public params = input.required<any>();

  protected _action() {
    let actionCb = this.action();
    if (actionCb) {
      actionCb(this.params());
    }
  }
}
