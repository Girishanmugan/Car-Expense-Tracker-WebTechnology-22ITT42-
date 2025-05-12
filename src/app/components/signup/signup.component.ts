import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // <-- Import Router here
import { AuthService } from '../../services/auth.service'; // <-- Import AuthService

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SignupComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.username, this.password).subscribe({
      next: () => {
        this.success = 'Signup successful! Please login.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err: any) => { // <-- Add type for err
        this.error = err.error?.message || 'Signup failed';
        this.success = '';
      }
    });
  }
}