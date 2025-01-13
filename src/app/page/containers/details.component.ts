import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [JsonPipe],
  template: `<pre><code>{{ container() | json }}</code></pre> `,
})
export class ContainerDetailsComponent {
  public container = input.required();
}
