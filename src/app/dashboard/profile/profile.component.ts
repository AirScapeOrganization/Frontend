import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormEditUserComponent } from '../../shared/components/form-edit-user/form-edit-user.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { UserService } from '../../shared/services/userService/user.service';
import { User } from '../../shared/interface/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormEditUserComponent, SideMenuComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isLoading: boolean = true;
  user: User | null = null;
  constructor(private userService: UserService) { }
  
    ngOnInit(): void {
      this.userService.user$.subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
  
      if (!this.user) {
        this.userService.loadUserFromToken();
      }
    }
}
