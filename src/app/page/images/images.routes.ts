import { Routes } from '@angular/router';
import { ImagesComponent } from './images.component';
import { ImageDetailsComponent } from './image-details.component';

export const routes: Routes = [
  { path: '', component: ImagesComponent },
  { path: ':id', component: ImageDetailsComponent },
];
