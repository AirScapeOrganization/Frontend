import { Component, inject } from '@angular/core';
import { ListingService } from '../../services/listingService/listing.service';
import { faLocationDot, faRestroom, faBed, faPeopleGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
  faLocationDot = faLocationDot;
  faRestroom = faRestroom;
  faBed = faBed;
  faPeopleGroup = faPeopleGroup;
  faTags = faTags;

  user: { id: number; username: string; role: string } | null = null;

  readonly ROLE_TENANT = 'Tenant';
  constructor(public listingService: ListingService, public userService: UserService){}

  ngOnInit() {
    this.loadUser();
  }

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
        }
      );
    } else {
      this.user = null; 
    }
  }


}
