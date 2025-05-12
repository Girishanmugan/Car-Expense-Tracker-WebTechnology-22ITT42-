import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
  { path: 'expenses', loadComponent: () => import('./components/expenses/expenses.component').then(m => m.ExpensesComponent) },
  { path: 'fuel', loadComponent: () => import('./components/fuel/fuel.component').then(m => m.FuelComponent) },
  { path: 'maintenance', loadComponent: () => import('./components/maintenance/maintenance.component').then(m => m.MaintenanceComponent) },
  { path: 'trips', loadComponent: () => import('./components/trips/trips.component').then(m => m.TripsComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' } // Wildcard route for undefined paths
];