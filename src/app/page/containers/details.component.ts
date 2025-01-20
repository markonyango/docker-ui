import { AsyncPipe, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Component, inject } from '@angular/core';
import { DetailsHeaderComponent } from './components/details-header/details-header.component';
import { InspectComponent } from './components/inspect/inspect.component';
import { LogsComponent } from './components/logs/logs.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, shareReplay } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe, InspectComponent, LogsComponent, DetailsHeaderComponent, MatTabsModule, NgIf],
  template: `
    <mat-tab-group>
      <mat-tab label="Inspect"><container-inspect [id]="id | async" /></mat-tab>
      <mat-tab label="Logs"><container-logs [id]="id | async" /></mat-tab>
      <mat-tab label="Stats"></mat-tab>
    </mat-tab-group>
  `,
})
export class ContainerDetailsComponent {
  public id: Observable<any> = inject(ActivatedRoute).paramMap.pipe(
    map(param_map => param_map.get('id')),
    filter(id => id != undefined && id != null),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
