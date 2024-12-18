import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faAngleDown, faBell } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faEnvelope, faCircleQuestion, faComments } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../interface/user';

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
  user: User | null = null;
  isLoading = true; 

  buttons = [
    { label: 'Home', link: '/home', icon: faHome, visibleOnRoutes: ['/explore', '/contact', '/help', '/blog', '/panel', '/panel/profile', '/panel/notifications'] },
    { label: 'Explore', link: '/explore', icon: faCompass, visibleOnRoutes: ['/', '/home', '/contact', '/blog', '/help', '/panel', '/panel/profile', '/panel/notifications'] },
    { label: 'Contact', link: '/contact', icon: faEnvelope, visibleOnRoutes: ['/', '/home', '/explore', '/blog', '/help', '/panel', '/panel/profile', '/panel/notifications'] },
    { label: 'Blog', link: '/blog', icon: faComments, visibleOnRoutes: ['/', '/home', '/explore', '/contact', '/help', '/panel', '/panel/profile', '/panel/notifications'] },
    { label: 'Help', link: '/help', icon: faCircleQuestion, visibleOnRoutes: ['/', '/home', '/explore', '/contact', '/blog', '/panel', '/panel/profile', '/panel/notifications']},
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
    this.router.navigate(['/panel/profile']);
  }

  navigateToPanel() {
    this.router.navigate(['/panel']);
  }

  logout(): void {
    this.isDropdownOpen = false;
    localStorage.removeItem('authToken');
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
} 