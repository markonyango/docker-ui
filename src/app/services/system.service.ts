import { Injectable, computed, effect, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { timer } from 'rxjs';

type State = { images: []; containers: []; volumes: [] };

@Injectable({ providedIn: 'root' })
export class SystemService {
  private state = signal<State>({ images: [], containers: [], volumes: [] });

  public readonly images = computed(() => this.state().images);
  public readonly containers = computed(() => this.state().containers);
  public readonly volumes = computed(() => this.state().volumes);

  public constructor() {
    timer(0, 10000).subscribe(() => this.get_system_data_usage());
  }

  public get_system_data_usage() {
    invoke<any>('get_system_data_usage').then(usage =>
      this.state.update(state => ({ ...state, images: usage.Images, containers: usage.Containers, volumes: usage.Volumes }))
    );
  }
}
