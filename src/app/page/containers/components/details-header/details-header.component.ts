import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'container-details-header',
  standalone: true,
  imports: [MatIconModule, NgClass, DatePipe],
  template: `
    <section class="prose flex flex-col m-3">
      <h1>
        <span class="text-2xl mb-1 mr-1">{{ container_name() }}</span
        ><span class="text-sm">({{ container_id() + '...' }}) | {{ container_image() }}</span>
      </h1>

      <div class="flex flex-col gap-1">
        <div class="flex flex-row gap-2">
          <span>Last started at:</span><span>{{ state().StartedAt | date: 'long' }}</span>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class DetailsHeaderComponent {
  public container = input.required<any>();

  protected state = computed(() => this.container().State);
  protected container_image = computed(() => this.container().Config.Image);
  protected container_name = computed(() => this.container().Name.slice(1));
  protected container_id = computed(() => this.container().Id.slice(0, 10));
}
