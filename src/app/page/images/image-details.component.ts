import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, shareReplay, switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [JsonPipe],
  template: `<pre><code>{{ image()?.inspect | json }}</code></pre>`,
  styles: ``,
})
export class ImageDetailsComponent {
  private _id: Observable<any> = inject(ActivatedRoute).paramMap.pipe(
    map(param_map => param_map.get('id')),
    filter(id => id != undefined && id != null),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private image_service = inject(ImageService);

  protected id = toSignal(this._id);
  protected image = this.image_service.select_image(this.id());

  ngOnInit() {
    this.image_service.inspect_image(this.id());
  }
}
