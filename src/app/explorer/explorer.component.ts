import { Component } from '@angular/core';
import { ListingsComponent } from '../shared/components/listings/listings.component';


@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [ListingsComponent],
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'] 
})
export class ExplorerComponent {
  
}
