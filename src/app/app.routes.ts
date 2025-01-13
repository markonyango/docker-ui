import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'containers', loadChildren: () => import('./page/containers/containers.routes').then(m => m.routes) },
  { path: 'images', loadChildren: () => import('./page/images/images.routes').then(m => m.routes) },
];
