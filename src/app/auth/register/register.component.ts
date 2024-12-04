import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  profile_picture = 'not_found';
  bio = 'not_found';
  is_owner: boolean | null = null;
  authService= inject(AuthService);

  
  constructor(private router: Router){}
  register() {

    if (!this.username || !this.email || !this.password || this.is_owner === null) {
      Swal.fire({
        icon: 'error',
        title: 'Form incomplete',
        text: 'Please fill all fields and select a role.',
        confirmButtonText: 'Accept',
      });
      return;
    }

    this.authService
      .register(this.username, this.email, this.password, this.profile_picture, this.bio, this.is_owner)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Register successfully',
            text: 'Redirecting to dashboard...',
            timer: 2000,
            showConfirmButton: false,
          });
          localStorage.setItem('authToken', response.token);
          console.log('Register successfully', response);

          setTimeout(() => {
            this.router.navigate(['/panel']);
          }, 2000);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: err.error?.message || 'An error occurred during registration.',
            confirmButtonText: 'Accept',
          });
          console.error('Error at registration:', err);
        },
      });
  }
}