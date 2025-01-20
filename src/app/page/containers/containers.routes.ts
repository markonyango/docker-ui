import { Routes } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { ContainerDetailsComponent } from './details.component';

export const routes: Routes = [
  { path: '', component: ContainersComponent },
  { path: ':id', component: ContainerDetailsComponent },
];
