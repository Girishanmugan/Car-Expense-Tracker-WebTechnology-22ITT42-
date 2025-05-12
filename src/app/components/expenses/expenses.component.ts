import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ExpensesComponent implements OnInit {
  newExpense = {
    date: '',
    category: '',
    amount: 0,
    note: ''
  };

  expenses: any[] = [];
  editIndex: number | null = null;
  private apiUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.expenses = data,
      error => console.error('Error fetching expenses:', error)
    );
  }

  addExpense(): void {
    if (this.editIndex !== null) {
      // Update existing expense
      const expenseId = this.expenses[this.editIndex]._id;
      this.http.put(`${this.apiUrl}/${expenseId}`, this.newExpense).subscribe(
        (response: any) => {
          this.expenses[this.editIndex!] = response;
          this.newExpense = { date: '', category: '', amount: 0, note: '' };
          this.editIndex = null;
        },
        error => console.error('Error updating expense:', error)
      );
    } else {
      // Add new expense
      this.http.post(this.apiUrl, this.newExpense).subscribe(
        (response: any) => {
          this.expenses.push(response);
          this.newExpense = { date: '', category: '', amount: 0, note: '' };
        },
        error => console.error('Error adding expense:', error)
      );
    }
  }

  editExpense(index: number): void {
    const expenseToEdit = this.expenses[index];
    this.newExpense = { ...expenseToEdit };
    this.editIndex = index;
    // Do NOT splice here, just set editIndex
  }

  deleteExpense(index: number): void {
    const expenseId = this.expenses[index]._id;
    this.http.delete(`${this.apiUrl}/${expenseId}`).subscribe(
      () => this.expenses.splice(index, 1),
      error => console.error('Error deleting expense:', error)
    );
  }
}