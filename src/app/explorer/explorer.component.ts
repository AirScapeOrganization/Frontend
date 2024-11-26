import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css'
})
export class ExplorerComponent {
  
}
