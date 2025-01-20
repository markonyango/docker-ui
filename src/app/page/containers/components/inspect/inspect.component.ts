import { Component, computed, inject, input } from '@angular/core';
import { ContainerService } from '../../../../services/container.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'container-inspect',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `<pre><code>{{ inspect() | json }}</code></pre>`,
  styles: ``,
})
export class InspectComponent {
  public readonly id = input.required<string>();
  private container_service = inject(ContainerService);
  protected inspect = computed(() => this.container_service.container()[this.id()]?.inspect);

  ngOnInit() {
    this.container_service.inspect_container(this.id());
  }
}
