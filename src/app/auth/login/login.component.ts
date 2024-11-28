import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { FormsModule } from '@angular/forms';


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

  constructor(private router: Router){}

  login(){
    this.authService.login(this.email, this.password);
    this.router.navigate(['/dashboard']);
  }
}
  