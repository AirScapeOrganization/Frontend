import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ListingsComponent } from '../shared/components/listings/listings.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [NavbarComponent, ListingsComponent, FooterComponent],
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'] 
})
export class ExplorerComponent {
  
}
