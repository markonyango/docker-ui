import { Injectable, computed, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { timer } from 'rxjs';
import { Container } from './docker.service';

type ContainerState = { inspect: any; logs: any[]; files: any[]; stats: any[] };

type State = {
  containers: any[];
  container: Record<string, ContainerState>;
};

@Injectable({ providedIn: 'root' })
export class ContainerService {
  private state = signal<State>({ containers: [], container: {} });

  public container_list = computed(() => this.state().containers);

  public container = computed(() => this.state().container);

  public constructor() {
    timer(0, 10000).subscribe(() => this.get_containers());
  }

  public get_containers() {
    invoke<Container[]>('get_containers').then(containers => this.state.update(state => ({ ...state, containers })));
  }

  public inspect_container(id: string) {
    invoke<any>('inspect_container', { id }).then(container => {
      this.state.update(state => ({
        ...state,
        container: { ...this.state().container, [id]: { ...this.state().container[id], inspect: container } },
      }));
    });
  }

  public get_container_stats_once(id: string) {
    invoke('get_container_stats_once', { id });
  }

  public get_container_logs_once(id: string) {
    invoke<any[]>('get_container_logs_once', { id }).then(logs =>
      this.state.update(state => ({ ...state, container: { ...state.container, [id]: { ...state.container[id], logs } } }))
    );
  }

  public stop_container(id: string) {
    return invoke('stop_container', { id });
  }

  public start_container(id: string) {
    return invoke('start_container', { id });
  }

  public remove_container(id: string) {
    return invoke('remove_container', { id });
  }

  /*
   * STATE STUFF
   */

  public select_container(id: string) {
    return computed(() => this.state().container[id]);
  }
}
