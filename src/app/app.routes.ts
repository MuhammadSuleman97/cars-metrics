import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarFormComponent } from './components/car-form/car-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-form', component: CarFormComponent }
];