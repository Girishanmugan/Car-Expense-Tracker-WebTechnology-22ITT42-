import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { FuelComponent } from './components/fuel/fuel.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { TripsComponent } from './components/trips/trips.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'expenses', component: ExpensesComponent },
  { path: 'fuel', component: FuelComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  { path: '**', redirectTo: '/login' } // Wildcard route to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}