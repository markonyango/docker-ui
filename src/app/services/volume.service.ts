import { Injectable, computed, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { timer } from 'rxjs';

type Volume = any;
type VolumeState = { inspect: any };
type State = { volumes: Volume[]; volume: Record<string, VolumeState> };

@Injectable({ providedIn: 'root' })
export class VolumeService {
  private state = signal<State>({ volumes: [], volume: {} });

  public volumes = computed(() => this.state().volumes);

  public volume = computed(() => this.state().volume);

  public constructor() {
    timer(0, 10000).subscribe(() => this.get_volumes());
  }

  public get_volumes() {
    // Docker API wraps the array in a { volumes: ... } object unlike with images and containers
    invoke<{ Volumes: Volume[] }>('get_volumes').then(volumes => this.state.update(state => ({ ...state, volumes: volumes.Volumes })));
  }

  public inspect_volume(id: string) {
    invoke('inspect_volume', { id }).then(volume =>
      this.state.update(state => ({ ...state, volume: { ...state.volume, [id]: { ...state.volume[id], inspect: volume } } }))
    );
  }

  public select_volume(id: string) {
    return computed(() => this.state().volume[id]);
  }
}
