import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faAngleDown, faBell } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faEnvelope, faCircleQuestion, faComments } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isMenuOpen = false;
  isDropdownOpen = false;
  faAngleDown = faAngleDown;
  faBell = faBell;
  currentRoute: string = '';
  user: { id: number; username: string; role: string } | null = null;

  isLoading = true;

  buttons = [
    { label: 'Home', link: '/', icon: faHome, visibleOnRoutes: ['/explore', '/contact', '/help', '/blog'] },
    { label: 'Explore', link: '/explore', icon: faCompass, visibleOnRoutes: ['/', '/contact', '/blog', '/help'] },
    { label: 'Contact', link: '/contact', icon: faEnvelope, visibleOnRoutes: ['/', '/explore', '/blog', '/help'] },
    { label: 'Blog', link: '/blog', icon: faComments, visibleOnRoutes: ['/', '/explore', '/contact', '/help'] },
    { label: 'Help', link: '/help', icon: faCircleQuestion, visibleOnRoutes: ['/', '/explore', '/contact', '/blog'] },
  ];

  filteredButtons = this.buttons;
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateFilteredButtons();
      }
    });
  
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  
    this.userService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  
    // Forzar la carga inicial del usuario
    this.userService.loadUserFromToken();
  }

  updateFilteredButtons() {
    this.filteredButtons = this.buttons.filter((button) =>
      button.visibleOnRoutes.includes(this.currentRoute)
    );
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  get showAuthLinks(): boolean {
    return !this.isLoading && !this.user;
  }

  logout(): void {
    this.isDropdownOpen = false;
    localStorage.removeItem('authToken');
    this.userService.clearUser();
    this.userService.loadUserFromToken(); // Actualiza el estado del usuario.
    this.router.navigate(['/login']);
  }
  
}
