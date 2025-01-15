import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="container">
      <div>
        <mat-icon inline="true">play_arrow</mat-icon>
        <span>{{ running() ?? 9 }}</span>
      </div>
      <div>
        <mat-icon inline="true">stop</mat-icon>
        <span>{{ stopped() ?? 15 }}</span>
      </div>
      <div>
        <mat-icon inline="true">pause</mat-icon>
        <span>{{ paused() ?? 0 }}</span>
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
  public readonly running = input();
  public readonly stopped = input();
  public readonly paused = input();
}
