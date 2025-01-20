import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, shareReplay } from 'rxjs';
import { VolumeService } from '../../services/volume.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-volume-details',
  standalone: true,
  imports: [JsonPipe],
  template: `<pre><code>{{ volume()?.inspect | json }}</code></pre>`,
  styles: ``,
})
export class VolumeDetailsComponent {
  private _id: Observable<any> = inject(ActivatedRoute).paramMap.pipe(
    map(param_map => param_map.get('id')),
    filter(id => id != undefined && id != null),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private volume_service = inject(VolumeService);

  protected id = toSignal(this._id);
  protected volume = this.volume_service.select_volume(this.id());

  ngOnInit() {
    this.volume_service.inspect_volume(this.id());
  }
}
