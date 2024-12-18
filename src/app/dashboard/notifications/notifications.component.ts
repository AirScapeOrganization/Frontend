import { Component } from '@angular/core';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { NotificationsFormComponent } from '../../shared/components/form-notifications/notifications-form.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SideMenuComponent, NotificationsFormComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
