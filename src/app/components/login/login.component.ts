import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- You must import RouterModule for standalone
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule] // <-- RouterModule must be in imports
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/expenses']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed'; // safer with optional chaining
      }
    });
  }
}