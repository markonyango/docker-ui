import { Injectable, computed } from '@angular/core';
import { forkJoin, from, interval, switchMap } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class DockerService {
  private readonly docker = toSignal(
    interval(1000).pipe(
      switchMap(() =>
        forkJoin({
          volumes: from(invoke<any[]>('get_images')),
        })
      )
    ),
    {
      initialValue: {
        volumes: [],
      },
    }
  );
}
