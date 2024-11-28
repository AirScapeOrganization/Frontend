import { Component, inject } from '@angular/core';
import { ListingService } from '../../services/listingService/listing.service';
import { faLocationDot, faRestroom, faBed, faPeopleGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
  faLocationDot = faLocationDot;
  faRestroom = faRestroom;
  faBed = faBed;
  faPeopleGroup = faPeopleGroup;
  faTags = faTags;

  public listingService = inject(ListingService);
}
