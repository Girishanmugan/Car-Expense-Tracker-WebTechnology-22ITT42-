import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class MaintenanceComponent {
  newMaintenance = {
    date: '',
    type: '',
    cost: 0
  };
  maintenanceHistory: { _id?: string; date: string; type: string; cost: number }[] = [];
  private apiUrl = 'http://localhost:3000/api/maintenance';
  editIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMaintenanceHistory();
  }

  getMaintenanceHistory() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.maintenanceHistory = data,
      error => console.error('Error fetching maintenance history:', error)
    );
  }

  addMaintenance() {
    if (this.editIndex !== null) {
      // Update existing maintenance entry
      const maintenanceId = this.maintenanceHistory[this.editIndex]._id;
      this.http.put(`${this.apiUrl}/${maintenanceId}`, this.newMaintenance).subscribe(
        (res: any) => {
          this.maintenanceHistory[this.editIndex!] = res;
          this.newMaintenance = { date: '', type: '', cost: 0 };
          this.editIndex = null;
        },
        err => console.error('Error updating maintenance:', err)
      );
    } else {
      // Add new maintenance entry
      if (this.newMaintenance.date && this.newMaintenance.type && this.newMaintenance.cost > 0) {
        this.http.post<any>(this.apiUrl, this.newMaintenance).subscribe(
          res => {
            this.maintenanceHistory.push(res);
            this.newMaintenance = { date: '', type: '', cost: 0 };
          },
          err => console.error('Error adding maintenance:', err)
        );
      }
    }
  }

  editMaintenance(index: number) {
    this.newMaintenance = { ...this.maintenanceHistory[index] };
    this.editIndex = index;
    // Do NOT splice here!
  }

  deleteMaintenance(index: number) {
    const maintenanceId = this.maintenanceHistory[index]._id;
    if (maintenanceId) {
      this.http.delete(`${this.apiUrl}/${maintenanceId}`).subscribe(
        () => this.maintenanceHistory.splice(index, 1),
        err => console.error('Error deleting maintenance:', err)
      );
    } else {
      this.maintenanceHistory.splice(index, 1);
    }
  }
}