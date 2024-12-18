import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/userService/user.service';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../shared/interface/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  faAngleRight = faAngleRight;
  user: User | null = null;
  loading: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.loadUserFromToken();

    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.userService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }
  
}
