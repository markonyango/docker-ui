import { Component, computed, effect, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SystemService } from '../../../services/system.service';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="container">
      <div>
        <mat-icon inline="true">play_arrow</mat-icon>
        <span>{{ running() }}</span>
      </div>
      <div>
        <mat-icon inline="true">stop</mat-icon>
        <span>{{ exited() }}</span>
      </div>
      <div>
        <mat-icon inline="true">pause</mat-icon>
        <span>{{ paused() }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        gap: 0.75em;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        vertical-align: center;
        width: 100%;
        height: 100%;
      }
      .container div {
        display: flex;
        flex-direction: column;
      }
      .container mat-icon {
        font-size: 5rem;
      }
    `,
  ],
})
export class ContainersComponent {
  protected readonly containers = inject(SystemService).containers;
  protected readonly running = computed(() => this.containers().filter((container: any) => container.State == 'running').length);
  protected readonly exited = computed(() => this.containers().filter((container: any) => container.State == 'exited').length);
  protected readonly paused = computed(() => this.containers().filter((container: any) => container.State == 'paused').length);
}
