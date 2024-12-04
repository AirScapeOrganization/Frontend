import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../shared/services/userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = this.userService.getUserFromToken(token);
      if (user) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
