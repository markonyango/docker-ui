import { Routes } from '@angular/router';
import { VolumesComponent } from './volumes.component';
import { VolumeDetailsComponent } from './volume-details.component';

export const routes: Routes = [
  { path: '', component: VolumesComponent },
  { path: ':id', component: VolumeDetailsComponent },
];
