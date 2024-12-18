import { Component } from '@angular/core';
import { PropertyDetailComponent } from '../shared/components/property-detail/property-detail.component';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [PropertyDetailComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {

}
