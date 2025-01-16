import { ResolveFn, Routes } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { ContainerDetailsComponent } from './details.component';
import { inject } from '@angular/core';
import { ContainerService } from '../../services/container.service';

const containerResolver: ResolveFn<any> = route => {
  let id = route.paramMap.get('id') ?? '';
  let container = inject(ContainerService).inspect_container(id);

  return container;
};

export const routes: Routes = [
  { path: '', component: ContainersComponent },
  { path: ':id', component: ContainerDetailsComponent, resolve: { container: containerResolver } },
];
