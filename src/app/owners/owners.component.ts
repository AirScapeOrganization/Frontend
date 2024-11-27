import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {

}
