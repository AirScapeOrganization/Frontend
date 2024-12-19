import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  // Icons
  faLocationDot = faLocationDot;
  faRestroom = faRestroom;
  faBed = faBed;
  faPeopleGroup = faPeopleGroup;
  faTags = faTags;

  // Variables
  user: User | null = null;
  listings: Listing[] | null = null;
  isLoading = true;

  readonly ROLE_TENANT = 'Tenant';

  constructor(
    public listingService: ListingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loadUserFromToken();
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.listingService.listing$.subscribe((listings) => {
      this.listings = listings;
    });

    this.listingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.listingService.getAllListings();
  }

  trackByListingId(index: number, item: Listing): any {
    return item.id;
  }
}
