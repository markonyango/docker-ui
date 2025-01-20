import { Injectable, computed, effect, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { timer } from 'rxjs';

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

type ImageState = { inspect: any };
type State = { images: Image[]; image: Record<string, ImageState> };

@Injectable({ providedIn: 'root' })
export class ImageService {
  private state = signal<State>({ images: [], image: {} });

  public images = computed(() => this.state().images);

  public image = computed(() => this.state().image);

  public constructor() {
    timer(0, 10000).subscribe(() => this.get_images());
  }

  public get_images() {
    invoke<Image[]>('get_images').then(images => this.state.update(state => ({ ...state, images })));
  }

  public inspect_image(id: string) {
    invoke<any>('inspect_image', { id }).then(inspect_image =>
      this.state.update(state => ({
        ...state,
        image: {
          ...state.image,
          [id]: {
            ...state.image[id],
            inspect: inspect_image,
          },
        },
      }))
    );
  }

  public remove_image(id: string) {}

  public select_image(id: string) {
    return computed(() => this.state().image[id]);
  }
}
