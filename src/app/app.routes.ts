import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'containers', loadChildren: () => import('./page/containers/containers.routes').then(m => m.routes) },
  { path: 'images', loadChildren: () => import('./page/images/images.routes').then(m => m.routes) },
  { path: 'volumes', loadChildren: () => import('./page/volumes/volumes.routes').then(m => m.routes) },
];
