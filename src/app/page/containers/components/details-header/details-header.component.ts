import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'container-details-header',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div>
        <span>Id:</span><span>{{ container().Id }}</span> <span>Status:</span><span>{{ state().Status }}</span>
      </div>
      <div>
        <span>Started at:</span><span>{{ state().StartedAt }}</span> <span>Finished at:</span><span>{{ state().FinishedAt }}</span>
      </div>
    </section>
  `,
  styles: ``,
})
export class DetailsHeaderComponent {
  public container = input.required<any>();

  protected state = computed(() => this.container().State);
}
