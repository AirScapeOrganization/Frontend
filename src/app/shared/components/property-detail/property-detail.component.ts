import { Component } from '@angular/core';
import { Listing } from '../../interface/listing';
import { ListingService } from '../../services/listingService/listing.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faUser, faDoorOpen, faBath } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  faUser = faUser;
  faDoorOpen = faDoorOpen;
  faBath = faBath;
  listing: Listing | null = null;
  isLoading: boolean = true;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const listingId = Number(this.route.snapshot.paramMap.get('id'));
    if (listingId) {
      this.listingService.getListingById(listingId).subscribe(
        (data) => {
          this.listing = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching listing data:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
