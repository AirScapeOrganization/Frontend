import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { UserService } from '../shared/services/userService/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user: { id: number; username: string; role: string } | null = null;

  constructor(public userService: UserService){}

  loadUser() {
    const token = localStorage.getItem('authToken');

    if (token) {
      const decode: any = jwtDecode(token);
      const userId = decode.sub;
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.user = {
            id: response.user_id,
            username: response.username,
            role: response.role
          };          
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.user = null;
        }
      );
    } else {
      this.user = null; 
    }
  }

}
