import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailsHeaderComponent } from './components/details-header/details-header.component';

@Component({
  standalone: true,
  imports: [JsonPipe, DetailsHeaderComponent],
  template: `
    <container-details-header [container]="container()" />
    <pre><code>{{ container() | json }}</code></pre>
  `,
})
export class ContainerDetailsComponent {
  public container = input.required();
}
