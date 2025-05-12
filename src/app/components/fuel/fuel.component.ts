import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  imports: [CommonModule, FormsModule, HttpClientModule] // <-- Add HttpClientModule for API calls
})
export class FuelComponent {
  newFuel = {
    date: '',
    liters: 0,
    totalCost: 0
  };
  fuelHistory: { _id?: string; date: string; liters: number; totalCost: number }[] = [];
  private apiUrl = 'http://localhost:3000/api/fuel';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFuelHistory();
  }

  getFuelHistory() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.fuelHistory = data,
      error => console.error('Error fetching fuel history:', error)
    );
  }

  editIndex: number | null = null;

editFuelPurchase(index: number) {
  this.newFuel = { ...this.fuelHistory[index] };
  this.editIndex = index;
}

addFuelPurchase() {
  if (this.editIndex !== null) {
    // Update existing fuel entry
    const fuelId = this.fuelHistory[this.editIndex]._id;
    this.http.put(`${this.apiUrl}/${fuelId}`, this.newFuel).subscribe(
      (res: any) => {
        this.fuelHistory[this.editIndex!] = res;
        this.newFuel = { date: '', liters: 0, totalCost: 0 };
        this.editIndex = null;
      },
      err => console.error('Error updating fuel purchase:', err)
    );
  } else {
    // Add new fuel entry
    this.http.post<any>(this.apiUrl, this.newFuel).subscribe(
      res => {
        this.fuelHistory.push(res);
        this.newFuel = { date: '', liters: 0, totalCost: 0 };
      },
      err => console.error('Error adding fuel purchase:', err)
    );
  }
}

  deleteFuelPurchase(index: number) {
    const fuelId = this.fuelHistory[index]._id;
    if (fuelId) {
      this.http.delete(`${this.apiUrl}/${fuelId}`).subscribe(
        () => this.fuelHistory.splice(index, 1),
        err => console.error('Error deleting fuel purchase:', err)
      );
    } else {
      this.fuelHistory.splice(index, 1);
    }
  }
}