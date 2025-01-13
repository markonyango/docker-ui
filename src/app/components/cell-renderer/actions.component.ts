import { NgComponentOutlet, NgForOf } from '@angular/common';
import { Component, InputSignal, Type } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export type IconAction<T = unknown, R = unknown> = (value: T) => R;
type ActionIconComponent = {
  action: InputSignal<(...args: unknown[]) => unknown>;
  params: InputSignal<ICellRendererParams>;
};
type IconComponent = {
  component: Type<ActionIconComponent>;
  action: IconAction;
};
type Icons = { components: IconComponent[] };

@Component({
  standalone: true,
  template: `
    <ng-container *ngFor="let iconComponent of params?.components">
      <ng-container
        *ngComponentOutlet="iconComponent.component; inputs: { action: iconComponent.action ?? defaultAction, params }"
      ></ng-container>
    </ng-container>
  `,
  imports: [NgForOf, NgComponentOutlet],
})
export class ActionsCellRendererComponent implements ICellRendererAngularComp {
  public params: (ICellRendererParams & Icons) | undefined;
  protected defaultAction = (...args: any[]) => console.warn('No action was defined...', args);

  agInit(params: ICellRendererParams & Icons): void {
    this.params = params;
  }
  refresh(): boolean {
    return true;
  }
}

type CellRendererParams = Record<string, unknown>;

export function cellRendererParamsWithIconAction<T, R>(iconAction: IconAction<T, R>, params?: CellRendererParams) {
  return {
    iconAction,
    ...params,
  };
}
