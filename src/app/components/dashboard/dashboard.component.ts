import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgComponentOutlet, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContainersComponent } from './tiles/containers.component';
import { ImagesComponent } from './tiles/images.component';
import { VolumesComponent } from './tiles/volumes.component';
import { CpuComponent } from './tiles/cpu.component';
import { RamComponent } from './tiles/ram.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [AsyncPipe, MatGridListModule, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, NgComponentOutlet, NgIf],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Containers', cols: 1, rows: 1, component: ContainersComponent },
          { title: 'Images', cols: 1, rows: 1, component: ImagesComponent },
          { title: 'Volumes', cols: 1, rows: 1, component: VolumesComponent },
        ];
      }

      return [
        { title: 'Containers', cols: 1, rows: 1, component: ContainersComponent },
        { title: 'Images', cols: 1, rows: 1, component: ImagesComponent },
        { title: 'Volumes', cols: 1, rows: 1, component: VolumesComponent },
        { title: 'CPU', cols: 3, rows: 1, component: CpuComponent },
        { title: 'RAM', cols: 3, rows: 1, component: RamComponent },
      ];
    })
  );
}
