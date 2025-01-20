import { Component, computed, inject, input } from '@angular/core';
import { SystemService } from '../../../services/system.service';

@Component({
  selector: 'app-volumes',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      {{ count() }}
    </div>
  `,
  styles: `
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
      width: 100%;
      font-size: 5rem;
    }
  `,
})
export class VolumesComponent {
  private readonly volumes = inject(SystemService).volumes;
  protected readonly count = computed(() => this.volumes().length);
}
