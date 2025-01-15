import { Injectable, computed } from '@angular/core';
import { forkJoin, from, interval, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { invoke } from '@tauri-apps/api/core';

export type Container = {
  name: string;
  image: string;
  ports: Port[];
  cpu: number;
  memory_usage: string;
  memory: number;
  network_usage: string;
  last_started: string;
};

export type Port = {
  ip: string;
  private_port: string;
  public_port?: string;
  typ: string;
};

export type Image = {
  Containers: number;
  Created: number;
  Id: string;
  Labels: Record<string, string>;
  ParentId: string;
  RepoDigests: string[];
  RepoTags: string[];
  SharedSize: number;
  Size: number;
};

@Injectable({ providedIn: 'root' })
export class DockerService {
  private readonly docker = toSignal(
    interval(1000).pipe(
      switchMap(() =>
        forkJoin({
          containers: from(invoke<any>('get_containers')),
          images: from(invoke<Image[]>('get_images')),
          volumes: from(invoke<any[]>('get_images')),
        })
      )
    ),
    {
      initialValue: {
        containers: [],
        images: [],
        volumes: [],
      },
    }
  );

  public readonly containers = computed<Container[]>(() => this.docker()?.containers);
  public readonly images = computed(() => this.docker()?.images);

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
