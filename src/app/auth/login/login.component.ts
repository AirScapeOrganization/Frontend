import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(AuthService);

  constructor(private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Log in succesfully',
          text: 'Redirect to dashboard...',
          timer: 2000,
          showConfirmButton: false,
        });
        localStorage.setItem('authToken', response.token);

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect data',
          text: 'Please verify your email or password',
          confirmButtonText: 'Accept',
        });
      },
    });
  }
}