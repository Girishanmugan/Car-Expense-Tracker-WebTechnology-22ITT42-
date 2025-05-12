import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: { description: string }[] = [];
  private fuel: { description: string }[] = [];
  private maintenance: { description: string }[] = [];
  private trips: { description: string }[] = [];

  // Expenses
  getExpenses() { return this.expenses; }
  addExpense(exp: { description: string }) { this.expenses.push(exp); }

  // Fuel
  getFuel() { return this.fuel; }
  addFuel(f: { description: string }) { this.fuel.push(f); }

  // Maintenance
  getMaintenance() { return this.maintenance; }
  addMaintenance(m: { description: string }) { this.maintenance.push(m); }

  // Trips
  getTrips() { return this.trips; }
  addTrip(t: { description: string }) { this.trips.push(t); }
}