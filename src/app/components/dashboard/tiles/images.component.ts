import { Component, input } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      {{ images() ?? 44 }}
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
export class ImagesComponent {
  public readonly images = input();
}
