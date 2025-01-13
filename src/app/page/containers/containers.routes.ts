import { ResolveFn, Routes } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { ContainerDetailsComponent } from './details.component';
import { Container, DockerService } from '../../services/docker.service';
import { inject } from '@angular/core';

const containerResolver: ResolveFn<any> = route => {
  let id = route.paramMap.get('id') ?? '';
  let container = inject(DockerService).get_container_details(id);

  return container;
};

export const routes: Routes = [
  { path: '', component: ContainersComponent },
  { path: ':id', component: ContainerDetailsComponent, resolve: { container: containerResolver } },
];
