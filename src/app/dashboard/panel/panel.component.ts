import { Component } from '@angular/core';
import { UserService } from '../../shared/services/userService/user.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  constructor(public userService: UserService){}
}
