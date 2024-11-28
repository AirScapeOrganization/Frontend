import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ListingService } from '../shared/services/listingService/listing.service';
import { faLocationDot, faRestroom, faBed, faPeopleGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FontAwesomeModule],
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'] 
})
export class ExplorerComponent {
  faLocationDot = faLocationDot;
  faRestroom = faRestroom;
  faBed = faBed;
  faPeopleGroup = faPeopleGroup;
  faTags = faTags;
  public listingService = inject(ListingService);
}
