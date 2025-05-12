import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class TripsComponent {
  newTrip = {
    date: '',
    startLocation: '',
    endLocation: '',
    distance: 0,
    fuelUsed: 0,
    cost: 0
  };
  trips: { _id?: string; date: string; startLocation: string; endLocation: string; distance: number; fuelUsed: number; cost: number }[] = [];
  private apiUrl = 'http://localhost:3000/api/trips';
  editIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.trips = data,
      error => console.error('Error fetching trips:', error)
    );
  }

  addTrip() {
    if (
      this.newTrip.date &&
      this.newTrip.startLocation.trim() &&
      this.newTrip.endLocation.trim() &&
      this.newTrip.distance > 0 &&
      this.newTrip.fuelUsed > 0 &&
      this.newTrip.cost > 0
    ) {
      if (this.editIndex !== null) {
        // Update existing trip
        const tripId = this.trips[this.editIndex]._id;
        this.http.put(`${this.apiUrl}/${tripId}`, this.newTrip).subscribe(
          (res: any) => {
            this.trips[this.editIndex!] = res;
            this.newTrip = { date: '', startLocation: '', endLocation: '', distance: 0, fuelUsed: 0, cost: 0 };
            this.editIndex = null;
          },
          err => console.error('Error updating trip:', err)
        );
      } else {
        // Add new trip
        this.http.post<any>(this.apiUrl, this.newTrip).subscribe(
          res => {
            this.trips.push(res);
            this.newTrip = { date: '', startLocation: '', endLocation: '', distance: 0, fuelUsed: 0, cost: 0 };
          },
          err => console.error('Error adding trip:', err)
        );
      }
    }
  }

  editTrip(index: number) {
    this.newTrip = { ...this.trips[index] };
    this.editIndex = index;
    // Do NOT splice here!
  }

  deleteTrip(index: number) {
    const tripId = this.trips[index]._id;
    if (tripId) {
      this.http.delete(`${this.apiUrl}/${tripId}`).subscribe(
        () => this.trips.splice(index, 1),
        err => console.error('Error deleting trip:', err)
      );
    } else {
      this.trips.splice(index, 1);
    }
  }
}