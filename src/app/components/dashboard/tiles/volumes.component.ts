import { Component, input } from '@angular/core';

@Component({
  selector: 'app-volumes',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      {{ volumes() ?? 21 }}
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
  public readonly volumes = input();
}
