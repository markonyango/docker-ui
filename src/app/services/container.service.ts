import { Injectable, Signal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { invoke } from '@tauri-apps/api/core';
import { from, interval, switchMap } from 'rxjs';
import { Container } from './docker.service';

@Injectable({ providedIn: 'root' })
export class ContainerService {
  private state = signal({ containers: [] });

  public container_list = toSignal(interval(1000).pipe(switchMap(() => this.get_containers())), {
    initialValue: [],
  });

  public get_containers() {
    return from(invoke<Container[]>('get_containers'));
  }

  public inspect_container(id: string) {
    return from(invoke('inspect_container', { id }));
  }

  public stop_container(id: string) {
    return from(invoke('stop_container', { id }));
  }

  public start_container(id: string) {
    return from(invoke('start_container', { id }));
  }

  public remove_container(id: string) {
    return from(invoke('remove_container', { id }));
  }
}
