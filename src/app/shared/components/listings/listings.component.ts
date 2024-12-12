import { Component, inject } from '@angular/core';
import { ListingService } from '../../services/listingService/listing.service';
import { faLocationDot, faRestroom, faBed, faPeopleGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { Listing } from '../../interface/listing';
import { User } from '../../interface/user';

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

  user: User | null = null;

  readonly ROLE_TENANT = 'Tenant';
  constructor(public listingService: ListingService, private userService: UserService){}

  ngOnInit() {
    this.userService.loadUserFromToken();

    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  trackByListingId(index: number, item: Listing): any {
    return item.id;
  }

}
